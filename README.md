# Nova Report Generator
A [Laravel Nova](https://nova.laravel.com) report generator tool that can generate reports for any model with selected columns. It can also export the data in CSV and PDF format. It also has a filter option for date range and has functionality to sum any column. It is a very simple tool that can be used for generating reports for any model on any Laravel project which use Laravel Nova.


## Dependencies
- [PHP >= 7.3](https://www.php.net/downloads.php)
- [Laravel >= 8.0](https://laravel.com)
- [Nova >= 4.0](https://nova.laravel.com)
- [laravel-dompdf](https://github.com/barryvdh/laravel-dompdf)


## Installation
```sh
composer require salekur/nova-report-generator
```


## Compatibility
I have tested the following dependency versions.

| Dependency        | Versions |
| ----------------- | -------- |
| PHP               |  >= 7.3  |
| Laravel           |  >= 8.0  |
| Nova              |  >= 4.0  |
| laravel-dompdf    |  * (any) |


## Publish Configuration
Publish the configuration file using the following command:

```sh
php artisan vendor:publish --tag=reporter-config --provider=Salekur\NovaReportGenerator\ToolServiceProvider
```


## Publish Views (Optional)
You can publish the views file if you want to customize the views.
Publish the views file using the following command:
```sh
php artisan vendor:publish --tag=reporter-views --provider=Salekur\NovaReportGenerator\ToolServiceProvider
```

## Default Configuration

```php
<?php

return [
    /**
     * Name of the tool.
     *
     * This name will be displayed in the navigation bar and on the tool's index page.
     *
     */
    'name' => 'Reporter',

    /**
     * Path for the tool.
     *
     * This path will be used for building the url to the tool.
     *
     */
    'path' => 'reporter',

    /**
     * Icon name of the tool.
     *
     * This icon will be displayed on the navigation bar.
     * Icons list can be found at https://heroicons.com
     *
     */
    'icon' => 'document-text',

    /**
     * Tool's visibility.
     *
     * This option determines whether the tool will be displayed in the navigation bar or not.
     *
     */
    'visible' => true,


    /**
     * Export options.
     *
     * Options for exporting data.
     *
     */
    'export' => [
        /**
         * Name of the export file.
         *
         * This name will be used for generating the file.
         *
         */
        // 'name' => 'export',

        /**
         * Channels for exporting data.
         *
         * This option determines which channels will be available for exporting data.
         *
         */
        'channels' => [
            'csv' => true,
            'pdf' => true
        ],

        /**
         * PDF options.
         *
         * Options for generating PDF.
         *
         */
        'config' => [
            'format' => 'A4',
            'orientation' => 'landscape',
            'header' => [
                // 'image' => public_path('images/logo.png'),
                'title' => 'Invoice'
            ]
        ]
    ],

    /**
     * Models for the tool.
     *
     * This option determines which models will be available for generating reports.
     *
     */
    'models' => [
        'user' => [
            'name',
            'email',
            'created_at' => [
                // label for the column
                'label' => 'Date',
                // if you want to use period filter then set 'period' to true
                'period' => true
            ]
        ],
        
        'order' => [
            'number',
            'status',
            'price' => [
                // if you want to use sum of number column then set 'summable' to true
                'summable' => true
            ],
            'created_at' => [
                // label for the column
                'label' => 'Date',
                // if you want to use period filter then set 'period' to true
                'period' => true
            ]
        ],
    ]
];
```


## Issues
- Support for relational field is not yet complete.
- If if have any other issues then let me know at [Issues](https://github.com/SalekurPolas/nova-report-generator/issues)


## Credits
- [Abdullah Al Maruf](https://github.com/maruf-abd)
- [Shoriful Islam](https://github.com/ShorifulAkash)
