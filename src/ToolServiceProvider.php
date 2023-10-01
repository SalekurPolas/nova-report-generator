<?php

namespace Salekur\NovaReportGenerator;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Laravel\Nova\Events\ServingNova;
use Laravel\Nova\Http\Middleware\Authenticate;
use Laravel\Nova\Nova;
use Salekur\NovaReportGenerator\Http\Middleware\Authorize;

class ToolServiceProvider extends ServiceProvider {
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot() {
        $this->app->booted(function () {
            $this->routes();
        });

        Nova::serving(function (ServingNova $event) {
            Nova::provideToScript([
                'reporter.name' => config('nova-reporter.name'),
                'reporter.path' => config('nova-reporter.path'),
            ]);
        });

        $this->loadViewsFrom(__DIR__.'/../resources/views', 'nova-reporter');

        $this->publishes([
            __DIR__.'/../config/nova-reporter.php' => config_path('nova-reporter.php')
        ], 'reporter-config');

        $this->publishes([
            __DIR__.'/../resources/views' => resource_path('views/vendor/nova-reporter'),
        ], 'reporter-views');
    }

    /**
     * Register the tool's routes.
     *
     * @return void
     */
    protected function routes() {
        if ($this->app->routesAreCached()) {
            return;
        }

        Nova::router(['nova', Authenticate::class, Authorize::class], config('nova-reporter.path'))
            ->group(__DIR__.'/../routes/inertia.php');

        Route::middleware(['nova', Authorize::class])
            ->prefix('nova-vendor/' . config('nova-reporter.path'))
            ->group(__DIR__.'/../routes/api.php');
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register() {
        $this->mergeConfigFrom(
            __DIR__.'/../config/nova-reporter.php', 'nova-reporter'
        );
    }
}
