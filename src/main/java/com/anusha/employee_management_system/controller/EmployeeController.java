
package com.anusha.employee_management_system.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anusha.employee_management_system.entity.Employee;
import com.anusha.employee_management_system.service.EmployeeService;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    // Add Employee
    @PostMapping
    public ResponseEntity<Employee> addEmployee(
            @Valid @RequestBody Employee employee) {

        Employee savedEmployee = employeeService.addEmployee(employee);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedEmployee);
    }

    // Get All Employees
    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees() {

        return ResponseEntity.ok(
                employeeService.getAllEmployees()
        );
    }

    // Get Employee by ID
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                employeeService.getEmployeeById(id)
        );
    }

    // Update Employee
    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(
            @PathVariable Long id,
            @Valid @RequestBody Employee employee) {

        return ResponseEntity.ok(
                employeeService.updateEmployee(id, employee)
        );
    }

    // Delete Employee
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(
            @PathVariable Long id) {

        employeeService.deleteEmployee(id);

        return ResponseEntity.noContent().build();
    }
    
    // Get Employees by Department
 @GetMapping("/department/{department}")
 public ResponseEntity<List<Employee>> getEmployeesByDepartment(
         @PathVariable String department) {

     return ResponseEntity.ok(
             employeeService.getEmployeesByDepartment(department)
     );
 }

//Search Employees by Name
@GetMapping("/search")
public ResponseEntity<List<Employee>> searchEmployeesByName(
      @RequestParam String name) {

  return ResponseEntity.ok(
          employeeService.searchEmployeesByName(name)
  );
}

//Get Employees with Pagination
@GetMapping("/page")
public ResponseEntity<Page<Employee>> getEmployeesWithPagination(
     @RequestParam(defaultValue = "0") int page,
     @RequestParam(defaultValue = "5") int size) {

 return ResponseEntity.ok(
         employeeService.getEmployeesWithPagination(page, size)
 );
}

//Get Employees with Sorting
@GetMapping("/sort")
public ResponseEntity<Page<Employee>> getEmployeesWithSorting(
     @RequestParam(defaultValue = "salary") String field,
     @RequestParam(defaultValue = "asc") String direction) {

 return ResponseEntity.ok(
         employeeService.getEmployeesWithSorting(field, direction)
 );
}

}

