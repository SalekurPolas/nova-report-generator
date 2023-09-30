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
            'orientation' => 'portrait',
            'header' => [
                // 'image' => public_path('logo.png'),
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
        'User' => [
            'id',
            'name',
            'email',
            'created_at' => [
                'label' => 'Date',
                'period' => true
            ]
        ],
        
        /*
        'order' => [
            'id',
            'total' => [
                'summable' => true
            ],
            'created_at' => [
                'label' => 'Date',
                'period' => true
            ]
        ],
       */

    ]
];
