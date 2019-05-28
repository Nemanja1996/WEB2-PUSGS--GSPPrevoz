namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CatalogueHistoryMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CatalogueHistories",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TicketPrice = c.Single(nullable: false),
                        CatalogueID = c.Int(nullable: false),
                        TicketTypeID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Catalogues", t => t.CatalogueID, cascadeDelete: true)
                .ForeignKey("dbo.TicketTypes", t => t.TicketTypeID, cascadeDelete: true)
                .Index(t => t.CatalogueID)
                .Index(t => t.TicketTypeID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.CatalogueHistories", "TicketTypeID", "dbo.TicketTypes");
            DropForeignKey("dbo.CatalogueHistories", "CatalogueID", "dbo.Catalogues");
            DropIndex("dbo.CatalogueHistories", new[] { "TicketTypeID" });
            DropIndex("dbo.CatalogueHistories", new[] { "CatalogueID" });
            DropTable("dbo.CatalogueHistories");
        }
    }
}
