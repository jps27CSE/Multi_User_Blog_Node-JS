window.onload = function () {
  tinymce.init({
    selector: "textarea#tiny-mce-post-body",
    plugins: [
      "a11ychecker advcode advlist lists link checklist autolink autosave code",
      "preview",
      "searchreplace",
      "wordcount",
      "media table emoticons image imagetools",
    ],
    toolbar:
      "bold italic uderline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | forecolor backcolor emoticons | code preview ",
    height: 400,
    automatic_uploads: true,
    images_upload_url: "/uploads/postimage",
    images_upload_handler: function (blobInfo, success, failure) {
      let headers = new Header();
      headers.append("Accept", "Application/JSON");

      let formData = new FormData();
      formData.append("post-image", blobInfo.blob(), blobInfo.filename());

      let req = new Request("/uploads/postimage", {
        method: "POST",
        headers,
        mode: "cors",
        body: formData,
      });

      fetch(req)
        .then((res) => {
          res.json();
        })
        .then((data) => {
          success(data.imgUrl);
        })
        .catch(() => failure("HTTP Error"));
    },
  });
};
