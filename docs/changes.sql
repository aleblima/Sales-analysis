alter table venda drop foreign key venda_ibfk_2;
alter table venda drop column idcliente;
drop table cliente;

alter table itemvenda drop foreign key itemvenda_ibfk_2;
alter table itemvenda drop foreign key itemvenda_ibfk_1;
drop table itemvenda;

drop table produto;

alter table vendedor drop foreign key vendedor_ibfk_1;
alter table vendedor drop idregiao;

alter table vendedor add column idregiao int;
alter table vendedor add foreign key (idregiao) references regiao (idregiao);
