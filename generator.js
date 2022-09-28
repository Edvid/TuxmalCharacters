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

    let lastChecked = function() {
        let lc = 0;
        for (let i = 1; i <= 21; i++) {
            if(~[10, 13, 17, 20].indexOf(i) != 0) continue;//the horizontals don't count
            if(document.getElementById(`c${i}`).checked) lc = i;
        }
        return lc;
    }();

    let margin = 4;
    let YStep = (height - margin*2)/(Math.ceil(lastChecked/7));
    let XStep = (width - margin*2)/2;

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