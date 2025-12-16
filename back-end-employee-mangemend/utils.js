const jsonServer = require("json-server");
const router = jsonServer.router("db.json");

function readLastUsedDepartmentId(){
    try{
      const data = router.db.get("lastUsedId");
      return data.departmentId;
    } catch(error){
        console.log("last used if canod be found ");
        return 1;
        
    }
    
}

function writeLastUsedDepartmentId(value){
    const lastUsedId = router.db.get("lastUsedId").value();
    lastUsedId.departmentId = value;
    router.db.set("lastUsedId").write();
}

function readLastUsedEmployeeId(){
    try {
        const data = router.db.get("lastUsedId").value();
        return data.employeeId
    } catch (error) {
        console.log("error while reading sed emploie id ", error);
        return 1
    }
}

function writeLastUsedEmployeeId(value){
    const lastUsedId = router.db.get("lastUsedId").value();
    lastUsedId.employeeId = value;
    router.db.set("lastUsedId", lastUsedId).write();   
}

module.exports = {
    readLastUsedDepartmentId,
    writeLastUsedDepartmentId,
    readLastUsedEmployeeId,
    writeLastUsedEmployeeId
}