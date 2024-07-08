export const uploadImage = document.querySelector('.uploadImage');

uploadImage.addEventListener('click', () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadImage.src = e.target.result;
      uploadImage.style.objectFit = 'cover';
      uploadImage.style.width = '300px';
      uploadImage.style.height = '300px';
    };
    reader.readAsDataURL(file);
  });
  input.click();
});
