console.log("Products frontend javascript file");

$(function () {
  $("#process-btn").on("click", () => {
    $(".dish-container").slideToggle(500);
    $("#process-btn").css("display", "none");
  });

  $("#cancel-btn").on("click", () => {
    $(".dish-container").slideToggle(100);
    $("#process-btn").css("display", "flex");
  });

  $(".new-product-status").on("change", async function (e) {
    const id = e.target.id;
    const productStatus = $(`#${id}.new-product-status`).val();
    //console.log("id:", id);
    //console.log("productStatus:", productStatus);

    try {
      const response = await axios.post(`/admin/product/${id}`, {
        productStatus: productStatus,
      });
      console.log("response:", response);
      const result = response.data;
      if (result.data) {
        $(".new-product-status").blur();
      } else alert("Product update failed!");
    } catch (err) {
      console.log(err);
      alert("Product update failed!");
    }
  });

  /** Yeni bir spec (key-value) satırı ekle **/
  $("#add-spec-btn").on("click", () => {
    const row = `
      <div class="spec-row">
        <input type="text" class="spec-key" placeholder="e.g. RAM" />
        <input type="text" class="spec-value" placeholder="e.g. 16GB" />
        <button type="button" class="btn btn-danger remove-spec-btn">✕</button>
      </div>
    `;
    $("#specs-container").append(row);
  });

  /** Bir spec satırını sil (dinamik eklenen satırlar için event delegation) **/
  $("#specs-container").on("click", ".remove-spec-btn", function () {
    $(this).closest(".spec-row").remove();
  });
});

function validateForm() {
  const productName = $(".product-name").val();
  const productPrice = $(".product-price").val();
  const productLeftCount = $(".product-left-count").val();
  const productCategory = $(".product-category").val();
  const productBrand = $(".product-brand").val();
  const productDesc = $(".product-desc").val();
  const productStatus = $(".product-status").val();

  if (
    productName === "" ||
    productPrice === "" ||
    productLeftCount === "" ||
    productCategory === "" ||
    productBrand === "" ||
    productDesc === "" ||
    productStatus === ""
  ) {
    alert("Please insert all required inputs");
    return false;
  }

  /** Tüm spec satırlarını topla, JSON objesine çevir, hidden input'a yaz **/
  const specs = {};
  $(".spec-row").each(function () {
    const key = $(this).find(".spec-key").val().trim();
    const value = $(this).find(".spec-value").val().trim();
    if (key && value) {
      specs[key] = value;
    }
  });
  $("#product-specs-hidden").val(JSON.stringify(specs));

  return true;
}

function previewFileHandler(input, order) {
  const imgClassName = input.className;
  console.log("input:", input);

  const file = $(`.${imgClassName}`).get(0).files[0];
  const fileType = file["type"];
  const validImageType = ["image/jpg", "image/jpeg", "image/png"];

  if (!validImageType.includes(fileType)) {
    alert("Please insert only jpeg, jpg and png!");
  } else {
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        $(`#image-section-${order}`).attr("src", reader.result);
      };
      reader.readAsDataURL(file);
    }
  }
}
