

class vizochat {
    constructor(){
        this.init_vizo()    
    }
    #config  = {
        apiKey: '{{{apiKey}}}',
        userId: '{{{randomGen(30)}}}',
        ds_key: '{{{ds_key}}}',
    }
    init_vizo(){
        if(localStorage.getItem('vizo_id')){
            this.#config.userId = localStorage.getItem('vizo_id').length==30?localStorage.getItem('vizo_id'):this.#config.userId;
        }else{
            localStorage.setItem('vizo_id',this.#config.userId)
        }
    }
    config(){
        return this.#config
    }
    modify_config(data={username,userid,custom_data}){
        if(data.username)this.#config.username = data.username.toString()
        if(data.userid)this.#config.userid = data.userid.toString()
        if(data.custom_data)this.#config.custom_data = JSON.stringify(data.custom_data)
    }
}


function init_vizo(data={username,userid,custom_data}){
    let vizochatObj = new vizochat()
    vizochatObj.modify_config(data)
    let host = '{{{vizochat_host}}}'
    let body = document.querySelector('body')
    let widget = document.createElement('div')
    let widgetframe = document.createElement('iframe')
    let btn = document.createElement('button')
    let closebtn = document.createElement('button')
    let icon = document.createElement('img')
    let style = document.createElement('style')
    let vizo_main = document.createElement('div');
    
    widgetframe.setAttribute("src",host+"/widget/"+vizochatObj.config().apiKey+'?'+Object.keys(vizochatObj.config()).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(vizochatObj.config()[key])}`).join('&'));
    vizo_main.setAttribute("id", "vizo_main");
    btn.setAttribute("id", "vizo_btn");
    closebtn.setAttribute("id", "vizo_close_btn");
    icon.setAttribute("id", "vizo_icon");
    icon.setAttribute("src", host+'/assets/logo-with-bg.png');
    widgetframe.setAttribute("id", "vizo_widget_frame");
    widget.setAttribute("id", "vizo_widget");
    closebtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="25" height="25" viewBox="0 0 32 32" version="1.1">
        <path d="M16 0c-8.836 0-16 7.163-16 16s7.163 16 16 16c8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 30.032c-7.72 0-14-6.312-14-14.032s6.28-14 14-14 14 6.28 14 14-6.28 14.032-14 14.032zM21.657 10.344c-0.39-0.39-1.023-0.39-1.414 0l-4.242 4.242-4.242-4.242c-0.39-0.39-1.024-0.39-1.415 0s-0.39 1.024 0 1.414l4.242 4.242-4.242 4.242c-0.39 0.39-0.39 1.024 0 1.414s1.024 0.39 1.415 0l4.242-4.242 4.242 4.242c0.39 0.39 1.023 0.39 1.414 0s0.39-1.024 0-1.414l-4.242-4.242 4.242-4.242c0.391-0.391 0.391-1.024 0-1.414z"/>
    </svg>`;
    style.innerHTML = `
        #vizo_btn{
            background:transparent;
            width:50px;
            height:50px;
            border-radius:50px;
            padding:0;
            border:0;
            outer:0;
            position:fixed;
            bottom:15px;
            right:15px;
            z-index:9998;
        }
        #vizo_icon{
            width:100%;
            opacity:1;
            cursor:pointer;
        }
        #vizo_icon:hover{
            opacity:0.8
        }
        #vizo_widget{
            width:0px;
            height:0px;
            border-radius:500px;
            background:transparent;
            position:fixed;
            bottom:15px;
            right:15px;
            z-index:9999;
            transition:0.3s;
            overflow:hidden;
            opacity:0;
        }
        #vizo_widget.vizo_show{
            opacity:1;
            border-radius:0px;
            width:360px;
            height:690px;
        }
        #vizo_widget_frame{
            border:0;
            border-radius:15px;
            width:360px;
            height:650px;
        }
        #vizo_close_btn{
            border: 0;
            border-radius:50px;
            color:gray;
            background:transparent;
            margin-bottom:5px;
            margin-left:0;
            padding:0;
            cursor:pointer;
        }
        #vizo_close_btn:hover{
            color:black;
        }

        @media only screen and (max-width: 600px) {
            #vizo_widget.vizo_show{
                border-radius:0px;
                width:100%;
                height:100vh;
            }
            #vizo_widget{
                border-radius:0px;
                bottom:0px;
                right:0px;
            }
            #vizo_widget_frame{
                border:0;
                border-radius:0px;
                width:100%;
                height:100vh;
            }
            #vizo_close_btn{
                display:none;
            }
        }
    `
    widget.appendChild(closebtn)
    widget.appendChild(widgetframe)
    vizo_main.appendChild(widget)
    btn.appendChild(icon)
    vizo_main.appendChild(btn)

    body.appendChild(vizo_main)
    body.appendChild(style)
    vizo_widget()
}
function vizo_widget(){
    let vizo_modal_open_stat = false;
    document.getElementById('vizo_btn').addEventListener('click',show_widget)
    document.getElementById('vizo_close_btn').addEventListener('click',hide_widget)
    window.addEventListener('popstate', function(event) {
        console.log('sdfjsnikdfjnsjkdfn');
        if(vizo_modal_open_stat){
            hide_widget();
            history.pushState(null, null, location.href);
        }
      })

    function hide_widget(){
        vizo_modal_open_stat = false;
        document.getElementById('vizo_widget').classList.remove('vizo_show')
        document.getElementById('vizo_btn').style.display = 'block'
    }
    function show_widget(){
        vizo_modal_open_stat = true;
        document.getElementById('vizo_widget').classList.add('vizo_show')
        document.getElementById('vizo_btn').style.display = 'none'
    }
}
