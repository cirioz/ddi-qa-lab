
const prefixes = [
    {name: "10.0.0.0/8", active:false, family:"IPv4"}, 
    {name: "10.20.0.40", active:true, family:"IPv4"},
    {name: "2001:db8::/32", active:true, family:"IPv6"},
    {name: "10.22.30.40", active:true, family:"IPv4"},
    {name: "10.33.30.40", active:false, family:"IPv4"},
    {name: "2001:db8:1::/48", active:false, family:"IPv6"}
]

function getActivePrefixes(prefixes) {
    return prefixes.filter(prefix => prefix.active === true)
}


function getByFamily(prefixes, family) {
    return prefixes.filter(prefix => prefix.family === family)
}

function findByName (prefixes, name) {
    return prefixes.find(prefix => prefix.name === name )
}

console.log(getActivePrefixes(prefixes))
console.log(getByFamily(prefixes,"IPv4"))
console.log(findByName(prefixes, "10.33.30.40"))