using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FFStats.Persistence.Migrations
{
    public partial class newDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tb_Line",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    lineNome = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_Line", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "tb_mapa",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    mapaNome = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_mapa", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "tb_modo",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    modoDescricao = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_modo", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "tb_treino",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    treinoDescricao = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_treino", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "tb_jogador",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    jogadorNome = table.Column<string>(type: "TEXT", nullable: true),
                    jogadorNick = table.Column<string>(type: "TEXT", nullable: true),
                    idJogo = table.Column<int>(type: "INTEGER", nullable: false),
                    lineId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_jogador", x => x.id);
                    table.ForeignKey(
                        name: "FK_tb_jogador_tb_Line_lineId",
                        column: x => x.lineId,
                        principalTable: "tb_Line",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tb_call",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    callCidade = table.Column<string>(type: "TEXT", nullable: true),
                    mapaId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_call", x => x.id);
                    table.ForeignKey(
                        name: "FK_tb_call_tb_mapa_mapaId",
                        column: x => x.mapaId,
                        principalTable: "tb_mapa",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tb_submodo",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    submodoDescricao = table.Column<string>(type: "TEXT", nullable: true),
                    modoId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_submodo", x => x.id);
                    table.ForeignKey(
                        name: "FK_tb_submodo_tb_modo_modoId",
                        column: x => x.modoId,
                        principalTable: "tb_modo",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tb_partida",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
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
                    table.PrimaryKey("PK_tb_partida", x => x.id);
                    table.ForeignKey(
                        name: "FK_tb_partida_tb_call_callId",
                        column: x => x.callId,
                        principalTable: "tb_call",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tb_partida_tb_mapa_mapaId",
                        column: x => x.mapaId,
                        principalTable: "tb_mapa",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tb_partida_tb_modo_modoId",
                        column: x => x.modoId,
                        principalTable: "tb_modo",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tb_partida_tb_submodo_submodoId",
                        column: x => x.submodoId,
                        principalTable: "tb_submodo",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tb_partida_tb_treino_treinoId",
                        column: x => x.treinoId,
                        principalTable: "tb_treino",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tb_estatistica",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    partidaId = table.Column<int>(type: "INTEGER", nullable: false),
                    jogadorId = table.Column<int>(type: "INTEGER", nullable: false),
                    Kill = table.Column<int>(type: "INTEGER", nullable: false),
                    Morte = table.Column<int>(type: "INTEGER", nullable: false),
                    Assistencia = table.Column<int>(type: "INTEGER", nullable: false),
                    Dano = table.Column<int>(type: "INTEGER", nullable: false),
                    Derrubado = table.Column<int>(type: "INTEGER", nullable: false),
                    Cura = table.Column<int>(type: "INTEGER", nullable: false),
                    Levantados = table.Column<int>(type: "INTEGER", nullable: false),
                    Ressucitou = table.Column<int>(type: "INTEGER", nullable: false),
                    Tempo = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_estatistica", x => x.id);
                    table.ForeignKey(
                        name: "FK_tb_estatistica_tb_jogador_jogadorId",
                        column: x => x.jogadorId,
                        principalTable: "tb_jogador",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tb_estatistica_tb_partida_partidaId",
                        column: x => x.partidaId,
                        principalTable: "tb_partida",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tb_partidajogador",
                columns: table => new
                {
                    JogadorId = table.Column<int>(type: "INTEGER", nullable: false),
                    PartidaId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_partidajogador", x => new { x.PartidaId, x.JogadorId });
                    table.ForeignKey(
                        name: "FK_tb_partidajogador_tb_jogador_JogadorId",
                        column: x => x.JogadorId,
                        principalTable: "tb_jogador",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tb_partidajogador_tb_partida_PartidaId",
                        column: x => x.PartidaId,
                        principalTable: "tb_partida",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tb_call_mapaId",
                table: "tb_call",
                column: "mapaId");

            migrationBuilder.CreateIndex(
                name: "IX_tb_estatistica_jogadorId",
                table: "tb_estatistica",
                column: "jogadorId");

            migrationBuilder.CreateIndex(
                name: "IX_tb_estatistica_partidaId",
                table: "tb_estatistica",
                column: "partidaId");

            migrationBuilder.CreateIndex(
                name: "IX_tb_jogador_lineId",
                table: "tb_jogador",
                column: "lineId");

            migrationBuilder.CreateIndex(
                name: "IX_tb_partida_callId",
                table: "tb_partida",
                column: "callId");

            migrationBuilder.CreateIndex(
                name: "IX_tb_partida_mapaId",
                table: "tb_partida",
                column: "mapaId");

            migrationBuilder.CreateIndex(
                name: "IX_tb_partida_modoId",
                table: "tb_partida",
                column: "modoId");

            migrationBuilder.CreateIndex(
                name: "IX_tb_partida_submodoId",
                table: "tb_partida",
                column: "submodoId");

            migrationBuilder.CreateIndex(
                name: "IX_tb_partida_treinoId",
                table: "tb_partida",
                column: "treinoId");

            migrationBuilder.CreateIndex(
                name: "IX_tb_partidajogador_JogadorId",
                table: "tb_partidajogador",
                column: "JogadorId");

            migrationBuilder.CreateIndex(
                name: "IX_tb_submodo_modoId",
                table: "tb_submodo",
                column: "modoId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tb_estatistica");

            migrationBuilder.DropTable(
                name: "tb_partidajogador");

            migrationBuilder.DropTable(
                name: "tb_jogador");

            migrationBuilder.DropTable(
                name: "tb_partida");

            migrationBuilder.DropTable(
                name: "tb_Line");

            migrationBuilder.DropTable(
                name: "tb_call");

            migrationBuilder.DropTable(
                name: "tb_submodo");

            migrationBuilder.DropTable(
                name: "tb_treino");

            migrationBuilder.DropTable(
                name: "tb_mapa");

            migrationBuilder.DropTable(
                name: "tb_modo");
        }
    }
}
