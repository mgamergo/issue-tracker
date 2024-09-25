'use client'

import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AssigneeDropdown = () => {
  const [users, setUsers] = useState<User[]>([])
  // console.log(users)
  
  useEffect(() => {
    async function fetchUsers() {
      const {data} = await axios.get<User[]>('/api/users')
      setUsers(data)
    }
    fetchUsers()
  }, [])

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign to" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Users</Select.Label>
          {users.map(item => <Select.Item key={item.id} value={item.id}>{item.name}</Select.Item>)}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeDropdown;
