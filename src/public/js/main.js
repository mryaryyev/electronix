console.log("Basic frontend javascript file");

$(function () {
  function filterTable() {
    const term = $("#table-search").val().toLowerCase();
    let visibleCount = 0;

    $("table.data").each(function () {
      const $table = $(this);
      $table.find("tbody tr").each(function () {
        const matches = $(this).text().toLowerCase().includes(term);
        $(this).toggle(matches);
        if (matches) visibleCount++;
      });

      $table.siblings(".no-results").remove();
      if (visibleCount === 0 && term !== "") {
        $table.after(
          '<div class="no-results">No results found for "' + term + '".</div>',
        );
      }
    });
  }

  function resetTable() {
    $("table.data tbody tr").show();
    $(".no-results").remove();
    $("#table-search").val("");
    $("#table-search-clear").hide();
  }

  $("#table-search").on("input", function () {
    $("#table-search-clear").toggle($(this).val() !== "");
  });

  $("#table-search-btn").on("click", filterTable);

  $("#table-search").on("keypress", function (e) {
    if (e.which === 13) {
      e.preventDefault();
      filterTable();
    }
  });

  $("#table-search-clear").on("click", resetTable);
});
