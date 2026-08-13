function doPost(e) {

  try {

    const data = JSON.parse(e.postData.contents);

    const sheet =
      SpreadsheetApp
        .getActiveSpreadsheet()
        .getSheetByName("Orders");

    sheet.appendRow([
      data.orderId || "",
      new Date(),
      data.name || "",
      data.phone || "",
      data.address || "",
      data.city || "",
      data.pin || "",
      data.product || "",
      data.qty || "",
      data.amount || "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "New Order",
      "",
      ""
    ]);

    return ContentService
      .createTextOutput(
        JSON.stringify({
          success: true
        })
      )
      .setMimeType(
        ContentService.MimeType.JSON
      );

  } catch (error) {

    return ContentService
      .createTextOutput(
        JSON.stringify({
          success: false,
          error: error.toString()
        })
      )
      .setMimeType(
        ContentService.MimeType.JSON
      );
  }
}
