basic.showNumber(probots.ping(probots.conexiones_ret(conn.CON1)))


probots.initColorSensor(probots.conexiones_ret(conn.CON1))
if (probots.getSensedColorValue() == probots.colors_ret(Names_colors.White)) {
    basic.showString("WHITE")
}
