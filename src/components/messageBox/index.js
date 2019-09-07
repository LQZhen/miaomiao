import Vue from 'vue/dist/vue'
import messageBox from "./messageBox";
export default function (options) {
    const myComponent=Vue.extend(messageBox)
     const vm=new myComponent({
         el:document.createElement('div'),
         data:{
             title: options.title,
             content: options.content,
             ok: options.ok,
             cancle: options. cancle
         },
         methods:{
             handleCancle:function () {
                 document.body.removeChild(vm.$el)
             },
             handleOk:function () {
                 options.handleOk&&options.handleOk()
                 document.body.removeChild(vm.$el)
             }
         }
     })
    document.body.appendChild(vm.$el)
}
