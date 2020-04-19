"use strict";

let struct = module.exports;

struct.login_data = new Array(999);
struct.person_auth = new Array(999);
struct.person_sys = new Array(999);
struct.person_data = new Array(999);

for(let i = 0; i <= 999; i++) {

  struct.person_auth[i] = {
    flood_count: 0,
    flood_message_count: 0
  };

  struct.person_sys[i] = {
    auth_status: 0,
    voice_active: 0,
    voice_listen: 0,
    voice_disabled: 0,
    chat_timer: 0,
    chat_counter: 0,
    bhead_data1: 0,
    bhead_data2: 0,
    bhead_data3: 0,
    hair_color: 0,
    freeze: 0,
    duehuman: 0,
    spec: 0,
    active_phone: 0,
    fraction_ready: 0,
    fraction_ammo: 0,
    job_style: 0,
    job_enter: 0,
    job_action: 0,
    job_count: 0,
    job_payday: 0,
    enter_limit: 0,
    enter_house: -1,
    enter_garage: -1,
    store_money: 0,
    rent_money: 0,
    rent_car: "",
    person_summon_cars: 0,
    person_car: new Array(6),
    person_car_active: 0,
    store_complect_1: 0,
    store_complect_2: 0,
    store_complect_3: 0,
    store_complect_4: 0,
    store_complect_color: 0,
    storage_blip: new Array(999),
    bus_checkpoints: new Array(999),
    bus_checknumpoints: 0,
    bus_checknumhelpoints: 0,
    enter_gangzone: 0,
    enter_gangzone_war: 0,
    enter_materials: 0,
    admin_save_pos_x: 0,
    admin_save_pos_y: 0,
    admin_save_pos_z: 0,
    admin_sel_object_id: 0,
    admin_alogin_auth: 0,
    admin_alogin_level: 0,
    timestamp: 0
  };

  struct.person_sys[i].storage_blip[i] = 0;

  struct.person_data[i] = {
    id: 0,
    g_name:"",
    g_password:"",
    g_online:0,
    g_status:0,
    g_warns:0,
    g_web_ip:"",
    g_game_ip:"",
    g_ipreg:"",
    g_sex:"",
    g_character_create:0,
    g_character_style_1:"",
    g_character_style_2:"",
    g_character_style_3:"",
    g_character_style_4:"",
    g_character_head_color:0,
    g_level:0,
    g_exp:0,
    g_money:0,
    g_hungry:0,
    g_wanted:0,
    g_jail:0,
    g_jail_camera:0,
    g_jail_time:0,
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
    g_gang_rang:0
  };
}
