"use strict";

let gang = module.exports;

gang.get_name = function(gname) {
  switch(parseInt(gname)) {
    case 0: gname = "-"; break;
    case 1: gname = "The Groove Street Gang"; break;
    case 2: gname = "The Ballas Gang"; break;
  }
  return gname;
}

gang.get_rang = function(gang_id, gang_rang) {
  let rang_name = "";
  switch(parseInt(gang_id)) {
      case 0: {
        rang_name = "-";
      } break;
      case 1: {
        switch(parseInt(gang_rang)) {
          case 1: rang_name = "Newbie"; break;
          case 2: rang_name = "Member"; break;
          case 3: rang_name = "Co-Member"; break;
          case 4: rang_name = "Staff"; break;
          case 5: rang_name = "Leader"; break;
        }
      } break;
      case 2: {
        switch(parseInt(gang_rang)) {
          case 1: rang_name = "Newbie"; break;
          case 2: rang_name = "Member"; break;
          case 3: rang_name = "Co-Member"; break;
          case 4: rang_name = "Staff"; break;
          case 5: rang_name = "Leader"; break;
      } break;
    }
  }
  return rang_name;
}
