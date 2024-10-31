using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FFStats.Persistence.Migrations
{
    public partial class novasTabelas : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tb_temporada",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Descricao = table.Column<string>(type: "TEXT", nullable: true),
                    Inicio = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Fim = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_temporada", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tb_estatistica_rank",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    TemporadaId = table.Column<int>(type: "INTEGER", nullable: false),
                    JogadorId = table.Column<int>(type: "INTEGER", nullable: false),
                    Modelo = table.Column<string>(type: "TEXT", nullable: true),
                    Partidas = table.Column<int>(type: "INTEGER", nullable: false),
                    Kills = table.Column<int>(type: "INTEGER", nullable: false),
                    Mortes = table.Column<int>(type: "INTEGER", nullable: false),
                    DistanciaPercorrida = table.Column<double>(type: "REAL", nullable: false),
                    TempoSobrevivido = table.Column<int>(type: "INTEGER", nullable: false),
                    Revividos = table.Column<int>(type: "INTEGER", nullable: false),
                    MaiorKill = table.Column<int>(type: "INTEGER", nullable: false),
                    Dano = table.Column<int>(type: "INTEGER", nullable: false),
                    Capa = table.Column<int>(type: "INTEGER", nullable: false),
                    Derrubados = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_estatistica_rank", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tb_estatistica_rank_tb_jogador_JogadorId",
                        column: x => x.JogadorId,
                        principalTable: "tb_jogador",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tb_estatistica_rank_tb_temporada_TemporadaId",
                        column: x => x.TemporadaId,
                        principalTable: "tb_temporada",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tb_estatistica_rank_JogadorId",
                table: "tb_estatistica_rank",
                column: "JogadorId");

            migrationBuilder.CreateIndex(
                name: "IX_tb_estatistica_rank_TemporadaId",
                table: "tb_estatistica_rank",
                column: "TemporadaId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tb_estatistica_rank");

            migrationBuilder.DropTable(
                name: "tb_temporada");
        }
    }
}
