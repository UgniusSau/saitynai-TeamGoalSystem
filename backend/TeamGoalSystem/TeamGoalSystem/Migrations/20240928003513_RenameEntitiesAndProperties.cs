using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TeamGoalSystem.Migrations
{
    /// <inheritdoc />
    public partial class RenameEntitiesAndProperties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "isDeleted",
                table: "Teams",
                newName: "IsDeleted");

            migrationBuilder.RenameColumn(
                name: "isDeleted",
                table: "Members",
                newName: "IsDeleted");

            migrationBuilder.RenameColumn(
                name: "isDeleted",
                table: "Goals",
                newName: "IsDeleted");

            migrationBuilder.RenameColumn(
                name: "isCompleted",
                table: "Goals",
                newName: "IsCompleted");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsDeleted",
                table: "Teams",
                newName: "isDeleted");

            migrationBuilder.RenameColumn(
                name: "IsDeleted",
                table: "Members",
                newName: "isDeleted");

            migrationBuilder.RenameColumn(
                name: "IsDeleted",
                table: "Goals",
                newName: "isDeleted");

            migrationBuilder.RenameColumn(
                name: "IsCompleted",
                table: "Goals",
                newName: "isCompleted");
        }
    }
}
