<template>
    <div>
        <Head :title="name"/>
        <div class="flex flex-row items-center justify-between mb-4">
            <Heading>{{ name }}</Heading>
            <button v-if="selected.channel !== null" @click="download" class="font-bold bg-gray-900 border border-gray-300 text-white text-sm rounded focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px-6 py-2">
                DOWNLOAD
            </button>
        </div>
        <Card class="flex flex-col p-6" style="min-height: 300px">
            <div v-if="Object.entries(resources).length > 0">
                <div class="flex flex-row items-center justify-between gap-2 mb-4">
                    <div class="w-full text-center">
                        <label for="resources-selection" class="text-lg text-gray-900 dark:text-white mb-1">RESOURCE</label>
                        <select v-model="selected.resource" id="resources-selection" class="uppercase font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 p-2">
                            <option v-for="(value, key) in resources" :value="key" class="font-bold uppercase">{{ value.name }}</option>
                        </select>
                    </div>
                    <div v-if="resources[selected.resource].period" class="w-full text-center">
                        <label for="resources-period" class="text-lg text-gray-900 dark:text-white mb-1">PERIOD</label>
                        <select v-model="selected.period" id="resources-period" class="font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 p-2">
                            <option value="all" class="font-bold">ALL TIME</option>
                            <option value="today" class="font-bold">TODAY</option>
                            <option value="last_week" class="font-bold">LAST WEEK</option>
                            <option value="last_month" class="font-bold">LAST MONTH</option>
                            <option value="last_year" class="font-bold">LAST YEAR</option>
                            <option value="custom" class="font-bold">CUSTOM</option>
                        </select>
                    </div>
                    
                    <div class="w-full text-center" v-if="selected.period === 'custom'">
                        <label for="resources-from" class="text-lg text-gray-900 dark:text-white mb-1">FROM</label>
                        <input type="date" v-model="selected.from" id="resources-from" class="font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 p-2">
                    </div>
                    
                    <div class="w-full text-center" v-if="selected.period === 'custom'">
                        <label for="resources-to" class="text-lg text-gray-900 dark:text-white mb-1">TO</label>
                        <input type="date" v-model="selected.to" id="resources-to" class="font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 p-2">
                    </div>

                    <div class="w-full text-center" v-if="selected.channel !== null">
                        <label for="resources-channel" class="text-lg text-gray-900 dark:text-white mb-1">CHANNEL</label>
                        <select v-model="selected.channel" id="resources-channel" class="font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 p-2">
                            <option v-if="settings.channels.pdf" value="pdf" class="font-bold">PDF</option>
                            <option v-if="settings.channels.csv" value="csv" class="font-bold">CSV</option>
                        </select>
                    </div>
                </div>

                <div v-if="resources[selected.resource]['data'].length > 0">
                    <div v-for="(value, key) in resources[selected.resource]" class="flex flex-col">
                        <div v-if="key === 'fields'" class="flex flex-row justify-between gap-2 bg-gray-500 text-white p-2 rounded">
                            <div v-for="(field, key, index) in value" class="font-bold w-full" :class="index === 0 ? 'text-left' : (index === Object.entries(value).length - 1 ? 'text-right' : 'text-center')">
                                {{ field.label }}
                            </div>
                        </div>

                        <div v-if="key === 'data'" class="flex flex-col">
                            <div v-if="value.length > 0">
                                <div v-for="row in value" class="flex flex-row justify-between gap-2 p-2 bg-white even:bg-slate-50">
                                    <div v-for="(item, key, index) in row" class="w-full" :class="index === 0 ? 'text-left' : (index === Object.entries(row).length - 1 ? 'text-right' : 'text-center')">
                                        {{ formatDateField(item) }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr class="mt-1">
                    <div v-for="(value, key) in resources[selected.resource]" class="flex flex-col">
                        <div v-if="key === 'fields'" class="flex flex-row justify-between gap-2 p-2 rounded">
                            <div v-for="(field, key, index) in value" class="font-bold w-full uppercase" :class="index === 0 ? 'text-left' : (index === Object.entries(value).length - 1 ? 'text-right' : 'text-center')">
                                <span v-if="'sum' in field">
                                    {{ field.sum }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else>
                    <div class="flex flex-col items-center justify-center h-full">
                        <svg width="200px" height="200px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.5" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#1C274C"/>
                            <path d="M8.39747 17.4466C8.64413 17.7794 9.11385 17.8492 9.44661 17.6025C10.175 17.0627 11.0541 16.75 12 16.75C12.9459 16.75 13.825 17.0627 14.5534 17.6025C14.8862 17.8492 15.3559 17.7794 15.6025 17.4466C15.8492 17.1138 15.7794 16.6441 15.4466 16.3975C14.4742 15.6767 13.285 15.25 12 15.25C10.715 15.25 9.5258 15.6767 8.55339 16.3975C8.22062 16.6441 8.15082 17.1138 8.39747 17.4466Z" fill="#1C274C"/>
                            <path d="M15 12C15.5523 12 16 11.3284 16 10.5C16 9.67157 15.5523 9 15 9C14.4477 9 14 9.67157 14 10.5C14 11.3284 14.4477 12 15 12Z" fill="#1C274C"/>
                            <path d="M9 12C9.55228 12 10 11.3284 10 10.5C10 9.67157 9.55228 9 9 9C8.44772 9 8 9.67157 8 10.5C8 11.3284 8.44772 12 9 12Z" fill="#1C274C"/>
                        </svg>

                        <h2 class="font-bold text-lg text-red-600">No data available.</h2>
                    </div>
                </div>
            </div>
            <div v-else class="flex flex-col items-center justify-center h-full">
                <svg width="200px" height="200px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.5" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#1C274C"/>
                    <path d="M8.39747 17.4466C8.64413 17.7794 9.11385 17.8492 9.44661 17.6025C10.175 17.0627 11.0541 16.75 12 16.75C12.9459 16.75 13.825 17.0627 14.5534 17.6025C14.8862 17.8492 15.3559 17.7794 15.6025 17.4466C15.8492 17.1138 15.7794 16.6441 15.4466 16.3975C14.4742 15.6767 13.285 15.25 12 15.25C10.715 15.25 9.5258 15.6767 8.55339 16.3975C8.22062 16.6441 8.15082 17.1138 8.39747 17.4466Z" fill="#1C274C"/>
                    <path d="M15 12C15.5523 12 16 11.3284 16 10.5C16 9.67157 15.5523 9 15 9C14.4477 9 14 9.67157 14 10.5C14 11.3284 14.4477 12 15 12Z" fill="#1C274C"/>
                    <path d="M9 12C9.55228 12 10 11.3284 10 10.5C10 9.67157 9.55228 9 9 9C8.44772 9 8 9.67157 8 10.5C8 11.3284 8.44772 12 9 12Z" fill="#1C274C"/>
                </svg>
                
                <h2 class="font-bold text-lg text-red-600">{{ message }}</h2>
            </div>
        </Card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: null,
                route: null,
                message: null,
                resources: {},
                settings: {},

                selected: {
                    resource: null,
                    period: 'all',
                    from: null,
                    to: null,
                    channel: null,
                }
            };
        },

        mounted() {
            this.name = Nova.config('reporter.name');
            this.route = '/nova-vendor/' + Nova.config('reporter.path') + '/';
            this.retrieve();
        },

        watch: {
            'selected.resource': function() {
                this.clearFilter();
            },

            'selected.period': function() {
                this.filter();
            },

            'selected.from': function() {
                this.filter();
            },

            'selected.to': function() {
                this.filter();
            },
        },

        methods: {
            download() {
                Nova.request().post(this.route + 'download', {
                    resource: this.selected.resource,
                    fields: this.resources[this.selected.resource]['fields'],
                    data: this.resources[this.selected.resource]['data'],
                    period: this.selected.period,
                    from: this.selected.from,
                    to: this.selected.to,
                    channel: this.selected.channel
                }).then(response => {
                    if (response.data.status) {
                        window.open(response.data.url, '_blank');
                        Nova.success(response.data.message);
                    } else {
                        this.message = response.data.message;
                        Nova.error(response.data.error);
                    }
                }).catch(error => {
                    console.log(error);
                    Nova.error(error.response.data.message);
                });
            },

            formatDateField(value) {
                const date = new Date(value);

                if (date.getFullYear() <= 1970 || isNaN(date.getFullYear())) {
                    return value;
                }

                if (!isNaN(date.getTime())) {
                    return date.toLocaleDateString();
                }

                return value;
            },

            clearFilter() {
                this.selected.period = 'all';
                this.selected.from = null;
                this.selected.to = null;
            },

            filter() {
                Nova.request().post(this.route + 'filter', {
                    resource: this.selected.resource,
                    fields: this.resources[this.selected.resource]['fields'],
                    period: this.selected.period,
                    from: this.selected.from,
                    to: this.selected.to
                }).then(response => {
                    if (response.data.status) {
                        this.resources[this.selected.resource]['fields'] = response.data.data['fields'];
                        this.resources[this.selected.resource]['data'] = response.data.data['data'];
                    } else {
                        this.message = response.data.message;
                        Nova.error(response.data.error);
                    }
                }).catch(error => {
                    console.log(error);
                    Nova.error(error.response.data.message);
                });
            },

            retrieve() {
                Nova.request().post(this.route + 'resources').then(response => {
                    if (response.data.status) {
                        this.resources = response.data.resources;
                        this.settings = response.data.settings;

                        Object.entries(this.resources).forEach(([key, value]) => {
                            return this.selected.resource = key;
                        });
                        
                        Object.entries(this.settings.channels).forEach(([key, value]) => {
                            if (value) return this.selected.channel = key;
                        });
                    } else {
                        this.message = response.data.message;
                        Nova.error(response.data.error);
                    }
                }).catch(error => {
                    console.log(error);
                    Nova.error(error.response.data.message);
                });
            },
        },
    }
</script>