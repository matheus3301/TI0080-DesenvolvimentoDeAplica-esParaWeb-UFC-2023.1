window.addEventListener("DOMContentLoaded", (e) => {
    let acessibility_info = JSON.parse(localStorage.getItem("acessibility"));
    if (acessibility_info === null) {
        let acessibility_info = {
            css: "/css/style.main.css",
            font_size: 100,
        }
        localStorage.setItem("acessibility", JSON.stringify(acessibility_info));
    }
    change_css_path(acessibility_info.css);
    change_font_size(acessibility_info.font_size);
})

function change_css_path(css_path) {
    let css_tag = document.getElementById("app_css");
    css_tag.href = css_path;
}

function change_theme(){
    let acessibility_info = JSON.parse(localStorage.getItem("acessibility"));
    if (acessibility_info.css == "/css/style.main.css"){
        acessibility_info.css = "/css/style.contrast.css";
        change_css_path(acessibility_info.css);
        localStorage.setItem("acessibility", JSON.stringify(acessibility_info));
    } else {
        acessibility_info.css = "/css/style.main.css";
        change_css_path(acessibility_info.css);
        localStorage.setItem("acessibility", JSON.stringify(acessibility_info));   
    }
}

function change_font_size(font_size){
    document.body.style.fontSize = font_size + "%";
}

function increase_font_size(){
    let acessibility_info = JSON.parse(localStorage.getItem("acessibility"));
    if (acessibility_info.font_size <= 140){
        acessibility_info.font_size = acessibility_info.font_size + 10;
        change_font_size(acessibility_info.font_size);
        localStorage.setItem("acessibility", JSON.stringify(acessibility_info));
    }
}

function decrease_font_size(){
    let acessibility_info = JSON.parse(localStorage.getItem("acessibility"));
    if (acessibility_info.font_size >= 80){
        acessibility_info.font_size = acessibility_info.font_size - 10;
        change_font_size(acessibility_info.font_size);
        localStorage.setItem("acessibility", JSON.stringify(acessibility_info));
    }
}

function undo_changes() {
    let acessibility_info = {
        css: "/css/style.main.css",
        font_size: 100,
    }
    localStorage.setItem("acessibility", JSON.stringify(acessibility_info));
    change_css_path(acessibility_info.css);
    change_font_size(acessibility_info.font_size);
}