///<reference types="webpack-env" />
import Vue from 'vue';

import router from './router/index';
import AppComponent from './App.vue';

if (module.hot){
    const api = require('vue-hot-reload-api');
    const vue = require('vue');

    api.install(vue);

    if (!api.compatible){
        throw new Error('vue-hot-reload-api is not compatible with the version of Vue you are using.');
    }

    module.hot.accept();

    if (!module.hot.data){
        api.createRecord('AppComponentId', AppComponent);
    }
    else{
        api.reload('AppComponentId', AppComponent);
    }
}

let v = new Vue({
    el: '#app',
    router,
    template: `
        <div>
            <app-component></app-component>
        </div>`,
    components: {
        AppComponent
    }
});
