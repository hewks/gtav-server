"use strict";

let fraction = module.exports;

fraction.get_name = function(fraction) {
  switch(parseInt(fraction)) {
    case 0: fraction = "-"; break;
    case 1: fraction = "Army Fort-Zancyndo"; break;
    case 2: fraction = "Los Santos Police Department"; break;
  }
  return fraction;
}

fraction.get_rang = function(fraction, fraction_rang) {
  switch(parseInt(fraction)) {
    case 0: {
      fraction_rang = "-";
    } break;
    case 1: {
      switch(parseInt(fraction_rang)) {
        case 1: fraction_rang = "Private"; break;
        case 2: fraction_rang = "Private Second Class"; break;
        case 3: fraction_rang = "Private First Class"; break;
        case 4: fraction_rang = "Specialist"; break;
        case 5: fraction_rang = "Corporal"; break;
        case 6: fraction_rang = "Sergeant"; break;
        case 7: fraction_rang = "Staff Sergeant"; break;
        case 8: fraction_rang = "Sergeant First Class"; break;
        case 9: fraction_rang = "Master Sergeant"; break;
        case 10: fraction_rang = "First Sergeant"; break;
        case 11: fraction_rang = "Sergeant Major"; break;
        case 12: fraction_rang = "Command Sergeant Major"; break;
        case 13: fraction_rang = "Sergeant Major of the Army"; break;
        case 14: fraction_rang = "Warrant Officer 1"; break;
        case 15: fraction_rang = "Chief Warrant Officer 2"; break;
        case 16: fraction_rang = "Chief Warrant Officer 3"; break;
        case 17: fraction_rang = "Chief Warrant Officer 4"; break;
        case 18: fraction_rang = "Chief Warrant Officer 5"; break;
        case 19: fraction_rang = "Second Lieutenant"; break;
        case 20: fraction_rang = "First Lieutenant"; break;
        case 21: fraction_rang = "Captain"; break;
        case 22: fraction_rang = "Major"; break;
        case 23: fraction_rang = "Lieutenant Colonel"; break;
        case 24: fraction_rang = "Colonel"; break;
        case 25: fraction_rang = "Brigadier General"; break;
        case 26: fraction_rang = "Major General"; break;
        case 27: fraction_rang = "Lieutenant General"; break;
        case 28: fraction_rang = "General"; break;
      }
    } break;
    case 2: {
      switch(parseInt(fraction_rang)) {
        case 1: fraction_rang = "Police Officer I"; break;
        case 2: fraction_rang = "Police Officer II"; break;
        case 3: fraction_rang = "Police Officer III"; break;
        case 4: fraction_rang = "Sergeant I"; break;
        case 5: fraction_rang = "Sergeant II"; break;
        case 6: fraction_rang = "Detective I"; break;
        case 7: fraction_rang = "Detective II"; break;
        case 8: fraction_rang = "Detective III"; break;
        case 9: fraction_rang = "Lieutenant I"; break;
        case 10: fraction_rang = "Lieutenant II"; break;
        case 11: fraction_rang = "Captain I"; break;
        case 12: fraction_rang = "Captain II"; break;
        case 13: fraction_rang = "Captain III"; break;
        case 14: fraction_rang = "Commander"; break;
        case 15: fraction_rang = "Deputy Chief I"; break;
        case 16: fraction_rang = "Deputy Chief II"; break;
        case 17: fraction_rang = "Chief of Police"; break;
      }
    } break;
  }
  return fraction_rang;
}
