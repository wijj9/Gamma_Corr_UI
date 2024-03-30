function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    let files = evt.dataTransfer ? evt.dataTransfer.files : evt.target.files;
    let output = [];

    for (let i = 0, f; f = files[i]; i++) {
        if (!f.type.match('image.*')) {
            continue;
        }

        let reader = new FileReader();

        reader.onload = (function(theFile) {
            return function(e) {
                let span = document.createElement('span');
                span.innerHTML = ['<img id="preview" src="', e.target.result, '" title="', escape(theFile.name), '"/>'].join('');
                document.getElementById('drop_zone').innerHTML = '';
                document.getElementById('drop_zone').appendChild(span);
            };
        })(f);

        reader.readAsDataURL(f);
    }
}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
}

document.addEventListener('DOMContentLoaded', function() {
    let dropZone = document.getElementById('drop_zone');

    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleFileSelect, false);

    document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);
});