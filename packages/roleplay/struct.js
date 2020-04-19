"use strict";

let struct = module.exports;

struct.login_data = new Array(999);
struct.person_sys = new Array(999);
struct.person_data = new Array(999);

for(let i = 0; i <= 999; i++) {

  struct.person_sys[i] = {
    auth_status: 0,
    bhead_data1: 0,
    bhead_data2: 0,
    bhead_data3: 0,
    hair_color: 0,
    duehuman: 0,
    spec: 0,
    active_phone: 0,
    fraction_ready: 0,
    fraction_ammo: 0,
    job_enter: 0,
    job_action: 0,
    job_count: 0,
    enter_limit: 0,
    enter_house: -1,
    enter_garage: -1,
    person_summon_cars: 0,
    person_car: new Array(6),
    admin_save_pos_x: 0,
    admin_save_pos_y: 0,
    admin_save_pos_z: 0,
    timestamp: 0
  };

  struct.login_data[i] = {
    id: 0,
    login: "",
    password: "",
    banned: 0,
    balance: 0,
    persons: 0,
    email: "",
    phone: "",
    code: "",
    group_id: 0,
    type_id: 0,
    ip_reg: "",
    ip_last: "",
    create_time: 0,
  }

  struct.person_data[i] = {
    id: 0,
    account:"",
    status:0,
    warns:0,
    ip:"",
    g_name:"",
    g_sex:"",
    g_bio:"",
    g_character_create:0,
    g_character_style_1:"",
    g_character_style_2:"",
    g_character_style_3:"",
    g_character_head_color:0,
    g_money:0,
    g_victims: 0,
    g_respect: 0,
    g_zavisim: 0,
    g_drugs: 0,
    g_materials: 0,
    g_health:100,
    g_armour:100,
    g_job:0,
    g_fraction:0,
    g_fraction_clothes:0,
    g_fraction_rang:0,
    g_gang:0,
    g_gang_clothes:0,
    g_gang_rang:0,
  };
}
