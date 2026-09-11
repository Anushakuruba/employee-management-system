package com.anusha.employee_management_system.service;

import java.util.List;
import org.springframework.data.domain.Page;
import com.anusha.employee_management_system.entity.Employee;

public interface EmployeeService {

    Employee addEmployee(Employee employee);

    List<Employee> getAllEmployees();

    Employee getEmployeeById(Long id);

    Employee updateEmployee(Long id, Employee employee);

    void deleteEmployee(Long id);

    List<Employee> getEmployeesByDepartment(String department);
    
    List<Employee> searchEmployeesByName(String name);
    Page<Employee> getEmployeesWithPagination(int page, int size);
    Page<Employee> getEmployeesWithSorting(String field, String direction);


}
