using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FFStats.Persistence.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Jogadores",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    jogadorNome = table.Column<string>(type: "TEXT", nullable: true),
                    jogadorNick = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Jogadores", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Mapas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    mapaNome = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mapas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Modos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    modoDescricao = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Modos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Treinos",
                columns: table => new
                {
                    treinoId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    treinoDescricao = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Treinos", x => x.treinoId);
                });

            migrationBuilder.CreateTable(
                name: "Calls",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    callCidade = table.Column<string>(type: "TEXT", nullable: true),
                    mapaId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Calls", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Calls_Mapas_mapaId",
                        column: x => x.mapaId,
                        principalTable: "Mapas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Submodos",
                columns: table => new
                {
                    submodoId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    submodoDescricao = table.Column<string>(type: "TEXT", nullable: true),
                    modoId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Submodos", x => x.submodoId);
                    table.ForeignKey(
                        name: "FK_Submodos_Modos_modoId",
                        column: x => x.modoId,
                        principalTable: "Modos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Partidas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    partidaDescricao = table.Column<string>(type: "TEXT", nullable: true),
                    treinoId = table.Column<int>(type: "INTEGER", nullable: false),
                    mapaId = table.Column<int>(type: "INTEGER", nullable: false),
                    callId = table.Column<int>(type: "INTEGER", nullable: false),
                    modoId = table.Column<int>(type: "INTEGER", nullable: false),
                    submodoId = table.Column<int>(type: "INTEGER", nullable: false),
                    partidaData = table.Column<DateTime>(type: "TEXT", nullable: true),
                    posicao = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Partidas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Partidas_Calls_callId",
                        column: x => x.callId,
                        principalTable: "Calls",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Partidas_Mapas_mapaId",
                        column: x => x.mapaId,
                        principalTable: "Mapas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Partidas_Modos_modoId",
                        column: x => x.modoId,
                        principalTable: "Modos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Partidas_Submodos_submodoId",
                        column: x => x.submodoId,
                        principalTable: "Submodos",
                        principalColumn: "submodoId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Partidas_Treinos_treinoId",
                        column: x => x.treinoId,
                        principalTable: "Treinos",
                        principalColumn: "treinoId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Estatisticas",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    partidaId = table.Column<int>(type: "INTEGER", nullable: false),
                    jogadorId = table.Column<int>(type: "INTEGER", nullable: false),
                    Kill = table.Column<int>(type: "INTEGER", nullable: false),
                    Dano = table.Column<int>(type: "INTEGER", nullable: false),
                    Tempo = table.Column<int>(type: "INTEGER", nullable: false),
                    Assistencia = table.Column<int>(type: "INTEGER", nullable: false),
                    Ressucitado = table.Column<int>(type: "INTEGER", nullable: false),
                    Salvador = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Estatisticas", x => x.id);
                    table.ForeignKey(
                        name: "FK_Estatisticas_Jogadores_jogadorId",
                        column: x => x.jogadorId,
                        principalTable: "Jogadores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Estatisticas_Partidas_partidaId",
                        column: x => x.partidaId,
                        principalTable: "Partidas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PartidasJogadores",
                columns: table => new
                {
                    JogadorId = table.Column<int>(type: "INTEGER", nullable: false),
                    PartidaId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PartidasJogadores", x => new { x.PartidaId, x.JogadorId });
                    table.ForeignKey(
                        name: "FK_PartidasJogadores_Jogadores_JogadorId",
                        column: x => x.JogadorId,
                        principalTable: "Jogadores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PartidasJogadores_Partidas_PartidaId",
                        column: x => x.PartidaId,
                        principalTable: "Partidas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Calls_mapaId",
                table: "Calls",
                column: "mapaId");

            migrationBuilder.CreateIndex(
                name: "IX_Estatisticas_jogadorId",
                table: "Estatisticas",
                column: "jogadorId");

            migrationBuilder.CreateIndex(
                name: "IX_Estatisticas_partidaId",
                table: "Estatisticas",
                column: "partidaId");

            migrationBuilder.CreateIndex(
                name: "IX_Partidas_callId",
                table: "Partidas",
                column: "callId");

            migrationBuilder.CreateIndex(
                name: "IX_Partidas_mapaId",
                table: "Partidas",
                column: "mapaId");

            migrationBuilder.CreateIndex(
                name: "IX_Partidas_modoId",
                table: "Partidas",
                column: "modoId");

            migrationBuilder.CreateIndex(
                name: "IX_Partidas_submodoId",
                table: "Partidas",
                column: "submodoId");

            migrationBuilder.CreateIndex(
                name: "IX_Partidas_treinoId",
                table: "Partidas",
                column: "treinoId");

            migrationBuilder.CreateIndex(
                name: "IX_PartidasJogadores_JogadorId",
                table: "PartidasJogadores",
                column: "JogadorId");

            migrationBuilder.CreateIndex(
                name: "IX_Submodos_modoId",
                table: "Submodos",
                column: "modoId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Estatisticas");

            migrationBuilder.DropTable(
                name: "PartidasJogadores");

            migrationBuilder.DropTable(
                name: "Jogadores");

            migrationBuilder.DropTable(
                name: "Partidas");

            migrationBuilder.DropTable(
                name: "Calls");

            migrationBuilder.DropTable(
                name: "Submodos");

            migrationBuilder.DropTable(
                name: "Treinos");

            migrationBuilder.DropTable(
                name: "Mapas");

            migrationBuilder.DropTable(
                name: "Modos");
        }
    }
}
