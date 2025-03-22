fx_version "cerulean"
game "gta5"

shared_scripts {
    "config/**",
    "@es_extended/imports.lua",
}
client_scripts {
    "client/**",
}
server_scripts {
    "server/**",
}

ui_page "dist/index.html"
files { "dist/**" }
