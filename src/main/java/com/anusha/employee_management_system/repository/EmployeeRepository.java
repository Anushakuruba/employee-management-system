
package com.anusha.employee_management_system.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anusha.employee_management_system.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    List<Employee> findByDepartmentIgnoreCase(String department);
    List<Employee> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(
            String firstName, String lastName);

}
