import React from 'react';
import '../styles/tableHead.scss';

export default function TableHead() {
  return (
    <thead className="table-head-container">
      <tr className="table-row-container">
        <th>Nome</th>
        <th>Telefone</th>
        <th>Email</th>
        <th>Excluir</th>
      </tr>
    </thead>
  );
};
