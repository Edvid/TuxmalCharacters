const height = 100;
const width = 50;
let container = document.getElementById("container");
let symbol = document.createElementNS("http://www.w3.org/2000/svg", "svg");

symbol.setAttribute("xmlns", "http://www.w3.org/2000/svg");  
symbol.setAttribute("width", width);  
symbol.setAttribute("height", height);  
symbol.setAttribute("viewbox", `0 0 ${width} ${height}`);

container.appendChild(symbol);

for (let i = 1; i <= 21; i++) {
    document.getElementById(`c${i}`).addEventListener("change", generate)
}

function generate(){

    symbol.innerHTML = "";

    let rows = function() {
        let r = 1;
        for (let i = 21; i > 0; i--) {
            if(!document.getElementById(`c${i}`).checked) continue;
            if(~[8, 9, 11, 12, 14, 17, 20].indexOf(i) != 0 && r < 2) r = 2;
            if(~[15, 16, 18, 19, 21].indexOf(i) != 0 && r < 3) r = 3;
        }
        return r;
    }();

    let columns = function() {
        let c = 1;
        for (let i = 21; i > 0; i--) {
            if(!document.getElementById(`c${i}`).checked) continue;
            if(~[5, 6, 7, 12, 13, 14, 19, 20, 21].indexOf(i) != 0 && c < 2) c = 2;
        }
        return c;
    }();

    let margin = 4;
    let YStep = (height - margin*2)/rows;
    let XStep = (width - margin*2)/columns;

    let curCheckboxID = 1;
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 7; x++) {
            if(!document.getElementById(`c${curCheckboxID++}`).checked) continue;
            let curline = document.createElementNS("http://www.w3.org/2000/svg" , "line");
            
            let coords = function () {
                switch (x) {
                    case 0:
                        return [0, 0, y, y+1];
                    case 1:
                        return [0, 1, y, y+1];
                    case 2:
                        return [0, 1, y, y];
                    case 3:
                        return [1, 1, y, y+1];
                    case 4:
                        return [1, 2, y, y+1];
                    case 5:
                        return [1, 2, y, y];
                    case 6:
                        return [2, 2, y, y+1];
                    default:
                        break;
                }
            }();
            
            curline.setAttribute("x1", margin + coords[0]*XStep);
            curline.setAttribute("x2", margin + coords[1]*XStep);
            curline.setAttribute("y1", margin + coords[2]*YStep);
            curline.setAttribute("y2", margin + coords[3]*YStep);
            curline.setAttribute("stroke", "black");
            curline.setAttribute("stroke-width", "4");
            curline.setAttribute("stroke-linecap", "round");

            symbol.appendChild(curline);
        }
    }

    let outercopy = document.querySelector("svg").outerHTML;

    download("tüxmäl_character_unnamed.svg", outercopy);
}

//Taken from Matěj Pokorný at https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-not-through-server
function download(filename, text) {
    var element = document.querySelector('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  }