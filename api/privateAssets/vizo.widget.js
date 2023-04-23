

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
    let imagePopup = document.createElement('div');
    let imagePopupImg = document.createElement('img');
    let imagePopupLoader = document.createElement('div');
    let imagePopupCloseBtn = document.createElement('button');
    
    widgetframe.setAttribute("src",host+"/widget/"+vizochatObj.config().apiKey+'?'+Object.keys(vizochatObj.config()).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(vizochatObj.config()[key])}`).join('&'));
    vizo_main.setAttribute("id", "vizo_main");
    btn.setAttribute("id", "vizo_btn");
    closebtn.setAttribute("id", "vizo_close_btn");
    icon.setAttribute("id", "vizo_icon");
    icon.setAttribute("src", host+'/assets/logo-with-bg.png');
    widgetframe.setAttribute("id", "vizo_widget_frame");
    widget.setAttribute("id", "vizo_widget");
    imagePopup.setAttribute("id", "vizo_widget_img_popup");
    imagePopupImg.setAttribute("id", "vizo_widget_img_popup_image");
    imagePopupLoader.setAttribute("id", "vizo_widget_img_popup_Loader");
    imagePopupCloseBtn.setAttribute("id", "vizo_widget_img_popup_close_btn");
    imagePopupLoader.classList.add('skeleton-loader')
    imagePopupLoader.innerHTML = "Image is loading.."
    closebtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="25" height="25" viewBox="0 0 32 32" version="1.1">
        <path d="M16 0c-8.836 0-16 7.163-16 16s7.163 16 16 16c8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 30.032c-7.72 0-14-6.312-14-14.032s6.28-14 14-14 14 6.28 14 14-6.28 14.032-14 14.032zM21.657 10.344c-0.39-0.39-1.023-0.39-1.414 0l-4.242 4.242-4.242-4.242c-0.39-0.39-1.024-0.39-1.415 0s-0.39 1.024 0 1.414l4.242 4.242-4.242 4.242c-0.39 0.39-0.39 1.024 0 1.414s1.024 0.39 1.415 0l4.242-4.242 4.242 4.242c0.39 0.39 1.023 0.39 1.414 0s0.39-1.024 0-1.414l-4.242-4.242 4.242-4.242c0.391-0.391 0.391-1.024 0-1.414z"/>
    </svg>`;
    imagePopupCloseBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z" fill="#000000"/></svg>`
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
        #vizo_widget_img_popup{
            position:fixed;
            z-index:9999;
            top:0;
            left:0;
            height:100vh;
            width:100%;
            background-color: rgba(2, 2, 2, 0.500);
            justify-content:center;
            align-items:center;
            display:none;
        }
        #vizo_widget_img_popup_image{
            max-width:90%;
            min-width:300px;
            max-height:100vh;
        }
        #vizo_widget_img_popup_close_btn{
            background-color:rgba(199, 199, 199, 0.644);
            border-radius:50px;
            cursor:pointer;
            padding:6px;
            width:40px;
            height:40px;
            outline:none;
            border:0;
            position:absolute;
            top:10px;
            right:10px;
        }
        #vizo_widget_img_popup_close_btn:hover{
            background-color:rgba(199, 199, 199, 0.800);

        }
        #vizo_widget_img_popup_Loader{
            min-width:90%;
            height:50vh;
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

        .skeleton-loader {
            animation-duration: 1.8s;
            animation-fill-mode: forwards;
            animation-iteration-count: infinite;
            animation-name: placeHolderShimmer;
            animation-timing-function: linear;
            background: linear-gradient(to right, #fafafa8e 8%, #949494c9 38%, #fafafa70 54%);
            background-size: 1000px 640px;
            
            position: relative;
            
        }

        @keyframes placeHolderShimmer{
            0%{
                background-position: -468px 0
            }
            100%{
                background-position: 468px 0
            }
        }
    `
    widget.appendChild(closebtn)
    widget.appendChild(widgetframe)
    vizo_main.appendChild(widget)
    btn.appendChild(icon)
    vizo_main.appendChild(btn)
    imagePopup.appendChild(imagePopupImg)
    imagePopup.appendChild(imagePopupLoader)
    imagePopup.appendChild(imagePopupCloseBtn)
    vizo_main.appendChild(imagePopup)

    body.appendChild(vizo_main)
    body.appendChild(style)
    imagePopupImg.addEventListener('load',()=>{
        imagePopupLoader.style.display = 'none'
        imagePopupImg.style.display = 'block'
        console.log('image loaded');
    })
    widgetframe.addEventListener('load', () => {
        const message = { type: 'USERINFO', data: { currentPage:window.location.href } };
        widgetframe.contentWindow.postMessage(message, '*');

        window.addEventListener('message', function(event) {
            if(event.data.type == 'IMAGEPOPUP'){
                imagePopupLoader.style.display = 'block'
                imagePopupImg.style.display = 'none'
                imagePopup.style.display = 'flex'
                imagePopupImg.setAttribute('src',event.data.data.img)
            }
        });
        imagePopupCloseBtn.addEventListener('click',()=>{
            imagePopup.style.display = 'none'
        })
    });
    vizo_widget()
}
function vizo_widget(){
    let vizo_modal_open_stat = false;
    document.getElementById('vizo_btn').addEventListener('click',show_widget)
    document.getElementById('vizo_close_btn').addEventListener('click',hide_widget)
    window.addEventListener('popstate', function(event) {
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
