use MonitorVendas;
create table regiao(
idregiao int primary key auto_increment,
nomeRegiao varchar(30)
);

create table Cliente(
idcliente int primary key auto_increment,
cpf varchar(11),
nomeCliente varchar(60)
);

create table Produto(
idproduto int primary key auto_increment,
nomeProduto varchar(100),
categoria varchar(30)
);

create table vendedor(
idvendedor int primary key auto_increment,
nomeVendedor varchar(60),
idregiao int unique,

foreign key (idregiao) references Regiao(idregiao)
);


create table venda(
idvenda int primary key auto_increment,
idvendedor int,
idcliente int,
total decimal(19,4),
periodo date,

foreign key (idvendedor) references Vendedor(idvendedor),
foreign key (idcliente) references Cliente(idcliente)
);

create table ItemVenda(
idvenda int,
idproduto int,
quantidade int,
subtotal decimal(19,4),

primary key (idvenda, idproduto),
foreign key (idvenda) references Venda(idvenda),
foreign key (idproduto) references Produto(idproduto)

);