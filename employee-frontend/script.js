const API_URL = "http://localhost:8080/api/employees";

let employees = [];
let currentPage = 1;
const employeesPerPage = 5;


// ======================================
// Notification
// ======================================

function showNotification(message, type) {

    const notification =
        document.getElementById("notification");

    notification.textContent = message;

    notification.className =
        "notification " + type;

    notification.style.display = "block";

    setTimeout(() => {
        notification.style.display = "none";
    }, 3000);
}


// ======================================
// Loading Message
// ======================================

function showLoading() {

    document.getElementById("employeeTableBody").innerHTML = `
        <tr>
            <td colspan="9" class="empty-message">
                Loading employees...
            </td>
        </tr>
    `;
}


// ======================================
// Load Employees
// ======================================

async function loadEmployees() {

    showLoading();

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch employees");
        }

        employees = await response.json();

        currentPage = 1;

        updateDashboard(employees);

        loadDepartments();

        applyFilters();

    } catch (error) {

        console.error("Error:", error);

        document.getElementById("employeeTableBody").innerHTML = `
            <tr>
                <td colspan="9" class="empty-message">
                    Unable to load employees.
                    Make sure Spring Boot is running.
                </td>
            </tr>
        `;

        showNotification(
            "Unable to connect to the server.",
            "error"
        );
    }
}


// ======================================
// Display Employees
// ======================================

function displayEmployees(employeeList) {

    const tableBody =
        document.getElementById("employeeTableBody");

    // Calculate pagination
    const startIndex =
        (currentPage - 1) * employeesPerPage;

    const endIndex =
        startIndex + employeesPerPage;

    const paginatedEmployees =
        employeeList.slice(startIndex, endIndex);

    // Clear table
    tableBody.innerHTML = "";


    // Empty state
    if (paginatedEmployees.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="9">
                    <div class="empty-message">
                        <strong>No employees found</strong>
                        Try changing your search or filter.
                    </div>
                </td>
            </tr>
        `;

        updatePagination(0);

        return;
    }


    // Display employees
    paginatedEmployees.forEach(employee => {

        const row =
            document.createElement("tr");


        row.innerHTML = `
            <td>${employee.id}</td>

            <td>
                <strong>
                    ${employee.firstName || ""}
                    ${employee.lastName || ""}
                </strong>
            </td>

            <td>
                ${employee.email || ""}
            </td>

            <td>
                ${employee.phone || ""}
            </td>

            <td>
                ${employee.department || ""}
            </td>

            <td>
                ${employee.designation || ""}
            </td>

            <td>
                ₹${Number(employee.salary || 0)
                    .toLocaleString("en-IN")}
            </td>

            <td>
                ${employee.joiningDate || ""}
            </td>

            <td class="action-buttons">

                <button
                    class="edit-btn"
                    onclick="editEmployee(${employee.id})">
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteEmployee(${employee.id})">
                    Delete
                </button>

            </td>
        `;


        tableBody.appendChild(row);

    });


    // Update pagination
    updatePagination(employeeList.length);
}


// ======================================
// Pagination
// ======================================

function updatePagination(totalItems) {

    const pagination =
        document.getElementById("pagination");


    if (totalItems === 0) {

        pagination.innerHTML = "";

        return;
    }


    const totalPages =
        Math.ceil(totalItems / employeesPerPage);


    if (totalPages <= 1) {

        pagination.innerHTML = "";

        return;
    }


    let html = "";


    // Previous button
    html += `
        <button
            class="page-btn"
            onclick="changePage(${currentPage - 1})"
            ${currentPage === 1 ? "disabled" : ""}>
            Previous
        </button>
    `;


    // Page numbers
    for (let i = 1; i <= totalPages; i++) {

        html += `
            <button
                class="page-btn ${i === currentPage ? "active" : ""}"
                onclick="changePage(${i})">
                ${i}
            </button>
        `;
    }


    // Next button
    html += `
        <button
            class="page-btn"
            onclick="changePage(${currentPage + 1})"
            ${currentPage === totalPages ? "disabled" : ""}>
            Next
        </button>
    `;


    pagination.innerHTML = html;
}


// ======================================
// Change Page
// ======================================

function changePage(page) {

    const searchText =
        document.getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();


    const selectedDepartment =
        document.getElementById("departmentFilter")
            .value;


    const sortValue =
        document.getElementById("sortSelect")
            .value;


    let filteredEmployees =
        employees.filter(employee => {

            const name =
                `${employee.firstName || ""} ${employee.lastName || ""}`
                    .toLowerCase();

            const email =
                (employee.email || "")
                    .toLowerCase();

            const department =
                (employee.department || "")
                    .toLowerCase();


            const matchesSearch =
                name.includes(searchText) ||
                email.includes(searchText) ||
                department.includes(searchText);


            const matchesDepartment =
                selectedDepartment === "all" ||
                department ===
                    selectedDepartment.toLowerCase();


            return (
                matchesSearch &&
                matchesDepartment
            );
        });


    // Name A-Z
    if (sortValue === "nameAsc") {

        filteredEmployees.sort((a, b) => {

            const nameA =
                `${a.firstName || ""} ${a.lastName || ""}`
                    .toLowerCase();

            const nameB =
                `${b.firstName || ""} ${b.lastName || ""}`
                    .toLowerCase();

            return nameA.localeCompare(nameB);
        });
    }


    // Salary Low to High
    if (sortValue === "salaryLow") {

        filteredEmployees.sort(
            (a, b) =>
                Number(a.salary || 0) -
                Number(b.salary || 0)
        );
    }


    // Salary High to Low
    if (sortValue === "salaryHigh") {

        filteredEmployees.sort(
            (a, b) =>
                Number(b.salary || 0) -
                Number(a.salary || 0)
        );
    }


    const totalPages =
        Math.ceil(
            filteredEmployees.length /
            employeesPerPage
        );


    if (page < 1 || page > totalPages) {
        return;
    }


    currentPage = page;

    displayEmployees(filteredEmployees);
}


// ======================================
// Dashboard
// ======================================

function updateDashboard(employeeList) {

    // Total Employees
    document.getElementById("totalEmployees")
        .textContent =
        employeeList.length;


    // IT Department
    const itCount =
        employeeList.filter(employee =>
            employee.department &&
            employee.department
                .toLowerCase() === "it"
        ).length;


    document.getElementById("itEmployees")
        .textContent =
        itCount;


    // Average Salary
    if (employeeList.length === 0) {

        document.getElementById("averageSalary")
            .textContent = "₹0";

        return;
    }


    const totalSalary =
        employeeList.reduce(
            (sum, employee) =>
                sum +
                Number(employee.salary || 0),
            0
        );


    const averageSalary =
        totalSalary /
        employeeList.length;


    document.getElementById("averageSalary")
        .textContent =
        "₹" +
        Math.round(averageSalary)
            .toLocaleString("en-IN");
}


// ======================================
// Department Filter
// ======================================

function loadDepartments() {

    const departmentFilter =
        document.getElementById("departmentFilter");


    const departments = [
        ...new Set(
            employees
                .map(employee =>
                    employee.department
                )
                .filter(department =>
                    department
                )
        )
    ];


    departments.sort();


    departmentFilter.innerHTML =
        `<option value="all">
            All Departments
        </option>`;


    departments.forEach(department => {

        const option =
            document.createElement("option");


        option.value =
            department;


        option.textContent =
            department;


        departmentFilter.appendChild(option);

    });
}


// ======================================
// Search + Filter + Sort
// ======================================

function applyFilters() {

    const searchText =
        document.getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();


    const selectedDepartment =
        document.getElementById("departmentFilter")
            .value;


    const sortValue =
        document.getElementById("sortSelect")
            .value;


    let filteredEmployees =
        employees.filter(employee => {

            const name =
                `${employee.firstName || ""} ${employee.lastName || ""}`
                    .toLowerCase();


            const email =
                (employee.email || "")
                    .toLowerCase();


            const department =
                (employee.department || "")
                    .toLowerCase();


            const matchesSearch =
                name.includes(searchText) ||
                email.includes(searchText) ||
                department.includes(searchText);


            const matchesDepartment =
                selectedDepartment === "all" ||
                department ===
                    selectedDepartment.toLowerCase();


            return (
                matchesSearch &&
                matchesDepartment
            );
        });


    // Name A-Z
    if (sortValue === "nameAsc") {

        filteredEmployees.sort((a, b) => {

            const nameA =
                `${a.firstName || ""} ${a.lastName || ""}`
                    .toLowerCase();


            const nameB =
                `${b.firstName || ""} ${b.lastName || ""}`
                    .toLowerCase();


            return nameA.localeCompare(nameB);
        });
    }


    // Salary Low to High
    if (sortValue === "salaryLow") {

        filteredEmployees.sort(
            (a, b) =>
                Number(a.salary || 0) -
                Number(b.salary || 0)
        );
    }


    // Salary High to Low
    if (sortValue === "salaryHigh") {

        filteredEmployees.sort(
            (a, b) =>
                Number(b.salary || 0) -
                Number(a.salary || 0)
        );
    }


    // Start from page 1 after filtering
    currentPage = 1;


    displayEmployees(filteredEmployees);
}


// ======================================
// Add Employee Modal
// ======================================

document.getElementById("addEmployeeBtn")
    .addEventListener(
        "click",
        function () {

            document.getElementById("modalTitle")
                .textContent =
                "Add Employee";


            document.getElementById("employeeForm")
                .reset();


            document.getElementById("employeeId")
                .value = "";


            document.getElementById("employeeModal")
                .style.display =
                "block";
        }
    );


// ======================================
// Close Modal
// ======================================

document.getElementById("closeModalBtn")
    .addEventListener(
        "click",
        closeModal
    );


document.getElementById("cancelBtn")
    .addEventListener(
        "click",
        closeModal
    );


function closeModal() {

    document.getElementById("employeeModal")
        .style.display =
        "none";
}


// ======================================
// Add / Update Employee
// ======================================

document.getElementById("employeeForm")
    .addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            // Get form values
            const firstName =
                document.getElementById("firstName")
                    .value
                    .trim();


            const lastName =
                document.getElementById("lastName")
                    .value
                    .trim();


            const email =
                document.getElementById("email")
                    .value
                    .trim();


            const phone =
                document.getElementById("phone")
                    .value
                    .trim();


            const salary =
                Number(
                    document.getElementById("salary")
                        .value
                );


            const joiningDate =
                document.getElementById("joiningDate")
                    .value;


            // Validation patterns
            const namePattern =
                /^[A-Za-z ]+$/;


            const phonePattern =
                /^[0-9]{10}$/;


            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            // First Name
            if (!namePattern.test(firstName)) {

                showNotification(
                    "First name should contain letters only.",
                    "error"
                );

                return;
            }


            // Last Name
            if (!namePattern.test(lastName)) {

                showNotification(
                    "Last name should contain letters only.",
                    "error"
                );

                return;
            }


            // Email
            if (!emailPattern.test(email)) {

                showNotification(
                    "Please enter a valid email address.",
                    "error"
                );

                return;
            }


            // Phone
            if (!phonePattern.test(phone)) {

                showNotification(
                    "Phone number must contain exactly 10 digits.",
                    "error"
                );

                return;
            }


            // Salary
            if (salary <= 0) {

                showNotification(
                    "Salary must be greater than 0.",
                    "error"
                );

                return;
            }


            // Joining Date
            if (!joiningDate) {

                showNotification(
                    "Please select a joining date.",
                    "error"
                );

                return;
            }


            // Employee ID
            const employeeId =
                document.getElementById("employeeId")
                    .value;


            // Employee object
            const employee = {

                firstName:
                    firstName,

                lastName:
                    lastName,

                email:
                    email,

                phone:
                    phone,

                department:
                    document.getElementById("department")
                        .value
                        .trim(),

                designation:
                    document.getElementById("designation")
                        .value
                        .trim(),

                salary:
                    salary,

                joiningDate:
                    joiningDate
            };


            try {

                let response;


                // UPDATE
                if (employeeId) {

                    response =
                        await fetch(
                            `${API_URL}/${employeeId}`,
                            {
                                method: "PUT",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify(
                                        employee
                                    )
                            }
                        );

                }

                // ADD
                else {

                    response =
                        await fetch(
                            API_URL,
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify(
                                        employee
                                    )
                            }
                        );
                }


                if (!response.ok) {

                    throw new Error(
                        await response.text()
                    );
                }


                closeModal();


                await loadEmployees();


                showNotification(
                    employeeId
                        ? "Employee updated successfully!"
                        : "Employee added successfully!",
                    "success"
                );


            } catch (error) {

                console.error(
                    "Error:",
                    error
                );


                showNotification(
                    "Failed to save employee.",
                    "error"
                );
            }

        }
    );


// ======================================
// Edit Employee
// ======================================

async function editEmployee(id) {

    try {

        const response =
            await fetch(
                `${API_URL}/${id}`
            );


        if (!response.ok) {

            throw new Error(
                "Employee not found"
            );
        }


        const employee =
            await response.json();


        document.getElementById("modalTitle")
            .textContent =
            "Edit Employee";


        document.getElementById("employeeId")
            .value =
            employee.id;


        document.getElementById("firstName")
            .value =
            employee.firstName || "";


        document.getElementById("lastName")
            .value =
            employee.lastName || "";


        document.getElementById("email")
            .value =
            employee.email || "";


        document.getElementById("phone")
            .value =
            employee.phone || "";


        document.getElementById("department")
            .value =
            employee.department || "";


        document.getElementById("designation")
            .value =
            employee.designation || "";


        document.getElementById("salary")
            .value =
            employee.salary || "";


        document.getElementById("joiningDate")
            .value =
            employee.joiningDate || "";


        document.getElementById("employeeModal")
            .style.display =
            "block";


    } catch (error) {

        console.error(
            "Error:",
            error
        );


        showNotification(
            "Unable to load employee details.",
            "error"
        );
    }
}


// ======================================
// Delete Employee
// ======================================

async function deleteEmployee(id) {

    const employee =
        employees.find(
            employee =>
                employee.id === id
        );


    if (!employee) {
        return;
    }


    const employeeName =
        `${employee.firstName || ""} ${employee.lastName || ""}`
            .trim();


    const confirmDelete =
        confirm(
            `Delete ${employeeName}?\n\nThis action cannot be undone.`
        );


    if (!confirmDelete) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/${id}`,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Delete failed"
            );
        }


        await loadEmployees();


        showNotification(
            "Employee deleted successfully!",
            "success"
        );


    } catch (error) {

        console.error(
            "Error:",
            error
        );


        showNotification(
            "Failed to delete employee.",
            "error"
        );
    }
}


// ======================================
// Search Event
// ======================================

document.getElementById("searchInput")
    .addEventListener(
        "input",
        applyFilters
    );


// ======================================
// Department Event
// ======================================

document.getElementById("departmentFilter")
    .addEventListener(
        "change",
        applyFilters
    );


// ======================================
// Sort Event
// ======================================

document.getElementById("sortSelect")
    .addEventListener(
        "change",
        applyFilters
    );


// ======================================
// Close Modal Outside
// ======================================

window.addEventListener(
    "click",
    function (event) {

        const modal =
            document.getElementById(
                "employeeModal"
            );


        if (event.target === modal) {

            closeModal();
        }
    }
);


// ======================================
// Start Application
// ======================================

loadEmployees();