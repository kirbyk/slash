var gs = require("google-spreadsheet");


var applicantsSheet = new gs(process.env.SHEET_KEY);

var creds = {
  client_email: process.env.CLIENT_EMAIL,
  private_key: process.env.PRIVATE_KEY
};


exports.webhook = function(req, res) {
  if (req.body.token !== process.env.SLACK_TOKEN) {
    return res.sendStatus(403);
  }

  applicantsSheet.useServiceAccountAuth(creds, function(authErr) {
    if (authErr) {
      return res.sendStatus(500);
    }

    applicantsSheet.getInfo(function(sheetErr, sheetInfo) {
      if (sheetErr) {
        return res.sendStatus(500);
      }

      var sheet = sheetInfo.worksheets[0];
      sheet.getRows(function(rowErr, rows) {
        if (rowErr) {
          return res.sendStatus(500);
        }

        var numApplicants = rows.length;
        var msg = numApplicants + ' people have applied to USB';

        res.send(msg);
      });
    });
  });
};
