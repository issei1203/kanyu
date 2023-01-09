document.addEventListener('DOMContentLoaded', function () {
    let loadButton = document.createElement('button');
    loadButton.innerText = '校正する';
    loadButton.className = 'button my-1 is-primary';
    loadButton.addEventListener('click', function (){
        let textarea = document.getElementById("proofreadTarget");
        fetch('http://ec2-13-115-168-56.ap-northeast-1.compute.amazonaws.com/proofread',{
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({text:textarea.value.toString()})
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`${res.status} ${res.statusText}`);
            }
            return res.json();
        })
        .then((json) => {
            console.log(json);
            document.getElementById("result")

            let resultNode = document.getElementById("result");
            while(resultNode.firstChild){
                resultNode.removeChild(resultNode.firstChild);
            }

            for (const error of json.errors) {
                let p = document.createElement('p');
                p.innerText = error.line + "行目: " + error.message;
                document.getElementById("result").appendChild(p);
            }
        });
    });

    document.getElementById("input").appendChild(loadButton);
});