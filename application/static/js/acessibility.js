const main_colors = {
    background: '#f5f5f5',
    primary: '#0072c6',
    dark_primary: '#0060a8',
    accent: '#ff9800',
    text: '#000000',
    text_secondary: '#333333',
}

const contrast_colors = {
    background: '#ffffff',
    primary: '#212121',
    dark_primary: '#1e1c1c',
    accent: '#00b200',
    text: '#000000',
    text_secondary: '#333333',
}

window.addEventListener("DOMContentLoaded", (e) => {
    let acessibility_info = JSON.parse(localStorage.getItem("acessibility"));
    if (acessibility_info === null) {
        let acessibility_info = {
            css: "main",
            font_size: 100,
        }
        localStorage.setItem("acessibility", JSON.stringify(acessibility_info));
    }
    change_css(acessibility_info.css);
    change_font_size(acessibility_info.font_size);
})

function change_css(css) {
    var root = document.querySelector(':root');
    if (css == 'main'){
        root.style.setProperty('--background', main_colors.background);
        root.style.setProperty('--primary', main_colors.primary);
        root.style.setProperty('--dark-primary', main_colors.dark_primary);
        root.style.setProperty('--accent', main_colors.accent);
        root.style.setProperty('--text', main_colors.text);
        root.style.setProperty('--text-secondary', main_colors.text_secondary);
    } else {
        root.style.setProperty('--background', contrast_colors.background);
        root.style.setProperty('--primary', contrast_colors.primary);
        root.style.setProperty('--dark-primary', contrast_colors.dark_primary);
        root.style.setProperty('--accent', contrast_colors.accent);
        root.style.setProperty('--text', contrast_colors.text);
        root.style.setProperty('--text-secondary', contrast_colors.text_secondary);
    }
}

function change_theme(){
    let acessibility_info = JSON.parse(localStorage.getItem("acessibility"));
    if (acessibility_info.css == "main"){
        acessibility_info.css = "contrast";
        change_css(acessibility_info.css);
        localStorage.setItem("acessibility", JSON.stringify(acessibility_info));
    } else {
        acessibility_info.css = "main";
        change_css(acessibility_info.css);
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
        css: "main",
        font_size: 100,
    }
    localStorage.setItem("acessibility", JSON.stringify(acessibility_info));
    change_css(acessibility_info.css);
    change_font_size(acessibility_info.font_size);
}