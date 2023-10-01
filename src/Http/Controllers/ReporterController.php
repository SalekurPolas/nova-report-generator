<?php

namespace Salekur\NovaReportGenerator\Http\Controllers;

use App\Http\Controllers\Controller;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;

class ReporterController extends Controller {
    public function resources() {
        $resources = config('nova-reporter.models');

        if ($resources === null) {
            return response()->json([
                'status' => false,
                'message' => 'Something went wrong !',
                'error' => 'No resources found on config'
            ]);
        }

        foreach ($resources as $resource => $fields) {
            $resource = ucfirst(strtolower($resource));

            

            if (!class_exists('App\\Models\\' . $resource)) {
                return response()->json([
                    'status' => false,
                    'message' => 'Something went wrong !',
                    'error' => "Model {$resource} not found"
                ]);
            }

            $period = false;
            $columns = [];

            $model = 'App\\Models\\' . $resource;
            $model = new $model;
            $table = $model->getTable();

            foreach ($fields as $field => $value) {
                if (is_numeric($field)) {
                    $field = $value;
                    $value = [];
                    $value['label'] = ucwords(str_replace('_', ' ', $field));
                } elseif (empty($value['label'])) {
                    $value['label'] = ucwords(str_replace('_', ' ', $field));
                }
                
                $columns[] = $field;
                if (!Schema::hasColumn($table, $field)) {
                    return response()->json([
                        'status' => false,
                        'message' => 'Something went wrong !',
                        'error' => "Field {$field} not found on {$resource}"
                    ]);
                }
                
                if (!empty($value['summable']) && $value['summable'] === true) {
                    $value['sum'] = number_format($model->sum($field) ?? 0.00, 2);           
                }

                if (!empty($value['period'])) {
                    if ($period === true) {
                        return response()->json([
                            'status' => false,
                            'message' => 'Something went wrong !',
                            'error' => "Only one period field allowed on {$resource}"
                        ]);
                    }

                    // if (!in_array(Schema::getColumnType($table, $field), ['date', 'datetime'])) {
                    //     return response()->json([
                    //         'status' => false,
                    //         'message' => 'Something went wrong !',
                    //         'error' => "Field {$field} must be date or datetime on {$resource}"
                    //     ]);
                    // }

                    try {
                        if (!in_array(Schema::getColumnType($table, $field), ['date', 'datetime'])) {
                            return response()->json([
                                'status' => false,
                                'message' => 'Something went wrong !',
                                'error' => "Field {$field} must be date or datetime on {$resource}"
                            ]);
                        }
                    } catch (\Exception $e) {
                        // ...
                    }

                    $period = true;
                }

                $data[$resource]['period'] = $period;
                $data[$resource]['fields'][$field] = $value;
            }

            $data[$resource]['name'] = $resource . 's';
            $data[$resource]['data'] = $model->select($columns)->get();
        }

        return response()->json([
            'status' => true,
            'resources' => $data ?? [],
            'settings' => config('nova-reporter.export') ?? [],
            'message' => count($data) > 0 ? 'Resources found' : 'No resources found'
        ]);
    }

    public function filter(Request $request) {
        $request->validate([
            'resource' => 'required',
            'period' => 'nullable',
            'from' => 'nullable',
            'to' => 'nullable'
        ]);

        $resource = $request->resource;
        $fields = $request->fields;

        $period = $request->period;
        $from = $request->from;
        $to = $request->to;

        $resource = ucfirst(strtolower($resource));
        $model = 'App\\Models\\' . $resource;
        $model = new $model;

        $columns = array_keys($fields);
        $query = $model->select($columns);

        if (!empty($period)) {
            $periodField = array_keys(array_filter($fields, function($field) {
                return !empty($field['period']);
            }))[0];
            
            if ($period == 'today') {
                $query->whereDate($periodField, date('Y-m-d'));
            }  elseif ($period == 'last_week') {
                $query->whereBetween($periodField, [ now()->subDays(7), now() ]);
            } elseif ($period == 'last_month') {
                $query->whereBetween($periodField, [ now()->subDays(30), now() ]);
            } elseif ($period == 'last_year') {
                $query->whereBetween($periodField, [ now()->subDays(365), now() ]);
            } elseif ($period == 'custom' && !empty($from)) {
                $query->where($periodField, '>=', $from);
                
                if (!empty($to)) {
                    $query->where($periodField, '<=', $to);
                }
            }
        }

        $data = $query->get();
        foreach ($fields as $field => $value) {
            if (!empty($value['summable']) && $value['summable'] === true) {
                $fields[$field]['sum'] = number_format($data->sum($field) ?? 0.00, 2);
            }
        }

        $temp = [];
        $temp['fields'] = $fields;
        $temp['data'] = $data;

        return response()->json([
            'status' => true,
            'data' => $temp ?? [],
            'message' => count($data) > 0 ? 'Data found' : 'No data found'
        ]);
    }

    public function download(Request $request) {
        $request->validate([
            'channel' => 'required'
        ]);

        $model = 'App\\Models\\' . $request->resource;
        $model = new $model;
        $table = $model->getTable();

        $name = config('nova-reporter.export.name', strtolower($request->resource) . 's');
        $columns = [];
        $data = [];

        foreach ($request->fields as $field => $value) {
            $columns[] = $value['label'];
        }

        foreach ($request->data as $item) {
            $temp = [];
            foreach ($request->fields as $field => $value) {
                $regex = '/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).(\d{6})Z$/';
                if (preg_match($regex, $item[$field])) {
                    $date = Carbon::parse($item[$field]);
                    $temp[] = $date->format('Y-m-d h:i:s A');
                    continue;
                }

                // if (in_array(Schema::getColumnType($table, $field), ['date', 'datetime'])) {
                //     $date = Carbon::parse($item[$field]);
                //     $temp[] = $date->format('Y-m-d h:i:s A');
                //     continue;
                // }

                $temp[] = $item[$field];
            }

            $data[] = $temp;
        }

        // work for csv
        if ($request->channel == 'csv') {
            $fp = fopen($name . '.csv', 'w');
            $sums = [];

            foreach ($request->fields as $field => $value) {
                $sums[] = !empty($value['sum']) ? '(Sum) ' . $value['sum'] : '';
            }

            foreach (array_merge([$columns], $data, [$sums]) as $fields) {
                fputcsv($fp, $fields);
            }

            fclose($fp);
            return response()->json([
                'status' => true,
                'message' => 'File downloaded successfully',
                'url' => url($name . '.csv')
            ]);
        } 

        // work for pdf
        if ($request->channel == 'pdf') {
            $config = [
                'name' => $name,
                'image' => config('nova-reporter.export.config.header.image'),
                'title' => config('nova-reporter.export.config.header.title'),
                'period' => $request->period,
                'from' => $request->from,
                'to' => $request->to
            ];
            
            $viewData = [
                'config' => $config,
                'fields' => $request->fields,
                'data' => $data
            ];

            $pdf = Pdf::loadView('nova-reporter::pdf', $viewData);
            $pdf->setPaper(
                config('nova-reporter.export.config.format', 'A4'), 
                config('nova-reporter.export.config.orientation', 'landscape')
            );

            $pdf = $pdf->output();
            file_put_contents($name . '.pdf', $pdf);

            return response()->json([
                'status' => true,
                'message' => 'File downloaded successfully',
                'url' => url($name . '.pdf')
            ]);
        }
    }
}