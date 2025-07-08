using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApiShop.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class DaoImp : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderItems_Orders_OrderDtoId",
                table: "OrderItems");

            migrationBuilder.DropIndex(
                name: "IX_OrderItems_OrderDtoId",
                table: "OrderItems");

            migrationBuilder.DropColumn(
                name: "OrderDtoId",
                table: "OrderItems");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "OrderDtoId",
                table: "OrderItems",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_OrderDtoId",
                table: "OrderItems",
                column: "OrderDtoId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItems_Orders_OrderDtoId",
                table: "OrderItems",
                column: "OrderDtoId",
                principalTable: "Orders",
                principalColumn: "Id");
        }
    }
}
