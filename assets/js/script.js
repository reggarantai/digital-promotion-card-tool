var imgToMark, init = true,
x = function() {return 230},
y = function() {return 128},
x2 = function() {return 230},
y2 = function() {return 163},
x3 = function() {return 917},
y3 = function() {return 1219};

function setPostcard(file){
  if(file.type.match(/image.*/)) {
    document.getElementById('preview').innerHTML = '<h3>Sedang proses...</h3><p>Mohon menunggu...</p>';
    document.getElementById('dl').innerHTML = '';

    var reader = new FileReader();
    reader.onload = function (readerEvent) {
      var image = new Image();
      image.onload = function (imageEvent) {

        var canvas = document.createElement('canvas'),
        max_width = 1280,
        max_height = 1280,
        width = image.width,
        height = image.height;

        if(width >= height){
          height *= max_width / width;
          width = max_width;
          if(height < max_height){
            width *= max_height / height;
            height = max_height;
          }
        }else{
          width *= max_height / height;
          height = max_height;
          if(width < max_width){
            height *= max_width / width;
            width = max_width;
          }
        }
        canvas.width = max_width;
        canvas.height = max_height;
        canvas.getContext('2d').drawImage(image, (width > max_width ? -((width - max_width)/2) : 0), (height > max_height ? -((height - max_height)/2) : 0), width, height);
        var dataUrl = canvas.toDataURL('image/jpeg'),
        text = document.getElementById('text').value,
        name = 'Oleh: ' + document.getElementById('name').value;

        var ul = text.upperLeft;

        watermark([dataUrl,'assets/images/blank-postcard.png'])
        .dataUrl(watermark.image.center(1))
        .render()
        .dataUrl(watermark.text.atPos(x, y, text, 'bold 40px Roboto', '#ffffff', 1))
        .render()
        .dataUrl(watermark.text.atPos(x2, y2, name, '18px Roboto', '#ffffffc7', 1))
        .render()
        .dataUrl(watermark.text.atPos(x3, y3, '# G e r a k a n J e m a r i A k h i r P e k a n', '16px Roboto', '#ffffffc7', 1))
        .then(function (marked) {
          var obj = new Image();
          obj.src = marked;
          document.getElementById('preview').innerHTML = '';
          document.getElementById('preview').appendChild(obj,dataUrl);

          document.getElementById('dl').innerHTML = '<br/><a class="btn btn-primary width-100" download="postcard-watermarked" href="'+obj.src+'">Klik disini untuk mengunduh</a>';
        });
      }
      image.src = readerEvent.target.result;
      if(init){
        init = false;
        setTimeout(function(){
          setPostcard(file);
        }, 250);
      }
    }
    reader.readAsDataURL(file);
  }
};

document.addEventListener('DOMContentLoaded', function () {

  /**
   * Memproses saat ada perubahan..
   */
  document.getElementById('uploadForm').addEventListener('change', function (e) {
    var input = e.target;
    if (input.type === 'text' && imgToMark) {
      setPostcard(imgToMark);
    }

    if (input.type === 'file') {
      imgToMark = input.files[0];
      setPostcard(imgToMark);
    }

  });


});
