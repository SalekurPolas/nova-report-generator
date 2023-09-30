<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Reporter</title>

    <style>
        @page {
            margin: 100px 25px;
        }

        header {
            position: fixed;
            top: -60px;
            left: 50px;
            right: 50px;
            color: black;
            text-align: center;
        }

        .detail tbody .item:nth-child(odd) {
            background: #f2f2ff;
        }
    </style>
</head>
<body style="font-size: 16px; font-weight: 400; font-family: 'Nunito', sans-serif; padding: 0 50px;">
    <header>
        <table style="width: 100%;">
            <tbody>
                <tr>
                    <td style="width: 50%;">
                        <img src="{{ $config['image_path'] }}" alt="image" style="width: 100px;">
                    </td>
                    <td style="width: 50%; text-align: right;">
                        <span style="font-size: 24px; font-weight: 600; text-transform: uppercase;">
                            {{ $config['name'] }}
                        </span>
    
                        <br>
                        @if (!empty($config['period']))
                            <span style="font-size: 16px; font-weight: 400; text-transform: uppercase;">
                                Period: {{ $config['period'] }}
                            </span>
                        @endif
                        
                        <br>
                        @if (!empty($config['from']))
                            <span style="font-size: 16px; font-weight: 400; text-transform: uppercase;">
                                From: {{ $config['from'] }}
                            </span>
                        @endif
                        
                        <br>
                        @if (!empty($config['to']))
                            <span style="font-size: 16px; font-weight: 400; text-transform: uppercase;">
                                To: {{ $config['to'] }}
                            </span>
                        @endif
                    </td>
                </tr>
            </tbody>
        </table>
    </header>

    <table class="detail" cellpadding="0" cellspacing="0" style="width: 100%; margin-top: 40px; border-collapse: collapse;">
        <tbody>
            @foreach ($data as $row)
                <tr class="item" style="font-weight: 400;">
                    @foreach ($row as $key => $column)
                        <td style="width: 100%; padding: 6px 12px; {{ $key === array_key_first($row) ? 'text-align: start;' : ($key === array_key_last($row) ? 'text-align: right;' : 'text-align: center;') }}">
                            {{ $column }}
                        </td>
                    @endforeach
                </tr>
            @endforeach

            <tr style="font-weight: 400;">
                @foreach ($fields as $key => $field)
                    @if(array_key_exists('summable', $field))
                        <td style="width: 100%; padding: 6px 12px; border-top: 1px solid black; {{ $key === array_key_first($fields) ? 'text-align: start;' : ($key === array_key_last($fields) ? 'text-align: right;' : 'text-align: center;') }}">
                            {{ $field['sum'] }}
                        </td>
                    @else
                        <td style="width: 100%; padding: 6px 12px;"></td>
                    @endif
                @endforeach
            </tr>
        </tbody>
    </table>
</body>
</html>