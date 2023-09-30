<?php

namespace Salekur\NovaReportGenerator;

use Illuminate\Http\Request;
use Laravel\Nova\Menu\MenuSection;
use Laravel\Nova\Nova;
use Laravel\Nova\Tool;

class NovaReportGenerator extends Tool {
    public string $name;
    public string $path;
    public string $icon;
    public bool $visible;

    public function __construct() {
        $this->name = config('nova-reporter.name');
        $this->path = config('nova-reporter.path');
        $this->icon = config('nova-reporter.icon');
        $this->visible = config('nova-reporter.visible');
    }

    /**
     * Perform any tasks that need to happen when the tool is booted.
     *
     * @return void
     */
    public function boot() {
        Nova::script('nova-report-generator', __DIR__.'/../dist/js/tool.js');
        Nova::style('nova-report-generator', __DIR__.'/../dist/css/tool.css');
    }

    /**
     * Build the menu that renders the navigation links for the tool.
     *
     * @param  \Illuminate\Http\Request $request
     * @return mixed
     */
    public function menu(Request $request) {
        if (!$this->visible) {
            return null;
        }

        return MenuSection::make($this->name)
            ->path('/' . $this->path)
            ->icon($this->icon);
    }

    public function hide() {
        $this->visible = false;
        return $this;
    }
}
