/**
 * Sets the tint of the player's specified weapon.
 * @param {Number} weaponHash The weapon hash.
 * @param {Number} tintIndex  The tint index.
 * @throws {TypeError} If any of the arguments is not a number.
 */
mp.Player.prototype.setWeaponTint = function(weaponHash, tintIndex) {
    if (!Number.isInteger(weaponHash) || !Number.isInteger(tintIndex)) throw new TypeError("Non number argument(s) passed to setWeaponTint.");

    this.__weaponTints[weaponHash] = tintIndex;
    if (this.weapon === weaponHash) this.setVariable("currentWeaponTint", `${weaponHash.toString(36)}|${tintIndex}`);
};

/**
 * Gets the tint of the player's specified weapon.
 * @param  {Number} weaponHash The weapon hash.
 * @returns {Number}            Tint of the specified weapon.
 * @throws {TypeError} If weaponHash argument is not a number.
 */
mp.Player.prototype.getWeaponTint = function(weaponHash) {
    if (!Number.isInteger(weaponHash)) throw new TypeError("Non number argument passed to getWeaponTint.");
    return this.__weaponTints.hasOwnProperty(weaponHash) ? this.__weaponTints[weaponHash] : 0;
};

/**
 * Returns an object that contains all weapon tints of the player. Key: weapon hash | Value: tint index
 * @returns {Object}
 */
mp.Player.prototype.getAllWeaponTints = function() {
    return this.__weaponTints;
};

/**
 * Resets tints of the player's all weapons.
 */
mp.Player.prototype.resetAllWeaponTints = function() {
    if (this.__weaponTints.hasOwnProperty(this.weapon)) this.setVariable("currentWeaponTint", `${this.weapon.toString(36)}|0`);
    this.__weaponTints = {};
};

// Events
mp.events.add("playerJoin", (player) => {
    player.__weaponTints = {};
});

mp.events.add("playerWeaponChange", (player, oldWeapon, newWeapon) => {
    player.setVariable("currentWeaponTint", `${newWeapon.toString(36)}|${player.__weaponTints.hasOwnProperty(newWeapon) ? player.__weaponTints[newWeapon] : 0}`);
});