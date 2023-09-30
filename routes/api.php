<?php

use Illuminate\Support\Facades\Route;
use Salekur\NovaReportGenerator\Http\Controllers\ReporterController;

/*
|--------------------------------------------------------------------------
| Tool API Routes
|--------------------------------------------------------------------------
|
| Here is where you may register API routes for your tool. These routes
| are loaded by the ServiceProvider of your tool. They are protected
| by your tool's "Authorize" middleware by default. Now, go build!
|
*/

Route::post('/resources', [ReporterController::class, 'resources']);
Route::post('/filter', [ReporterController::class, 'filter']);
Route::post('/download', [ReporterController::class, 'download']);
