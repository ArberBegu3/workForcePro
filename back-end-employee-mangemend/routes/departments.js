module.exports = function (server) {
    const {readLastUsedDepartmentId} = require("../utils");

    let departmentIdCounter = readLastUsedDepartmentId();

    const jsonServer = require("json-server");

    const router = jsonServer.router("db.json");

    //endpoint for creating and updaating new departemnet 
    server.post("/api/departments", (request, response) => {
        const requestBody = request.body;
        
        if (requestBody.id === undefined) {
            let departmentId = departmentIdCounter++;
            const newDepartment = {
                id: departmentId,
                name: requestBody.name,
                employee_list: [],
            }

            const departmentsData = router.db.get("departments").value();
            departmentsData.push(newDepartment);

            router.db.set("departments", departmentsData).write();

            const lastUsedId = router.db.get("lasUsedId").value();
            lastUsedId.departmentId = departmentIdCounter;
            router.db.set("lastUsedId", lastUsedId).write();

            response.status(201).json(newDepartment);
        } else {

        }
    })
}