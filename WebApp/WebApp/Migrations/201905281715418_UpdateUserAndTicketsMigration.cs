namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdateUserAndTicketsMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Tickets",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TicketTypeID = c.Int(),
                        CatalogueHistoryID = c.Int(nullable: false),
                        ApplicationUserID = c.String(nullable: false, maxLength: 128),
                        IsValid = c.Boolean(nullable: false),
                        TimeIssued = c.String(nullable: false, maxLength: 20),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.ApplicationUserID, cascadeDelete: true)
                .ForeignKey("dbo.CatalogueHistories", t => t.CatalogueHistoryID, cascadeDelete: true)
                .ForeignKey("dbo.TicketTypes", t => t.TicketTypeID)
                .Index(t => t.TicketTypeID)
                .Index(t => t.CatalogueHistoryID)
                .Index(t => t.ApplicationUserID);
            
            AddColumn("dbo.AspNetUsers", "FirstName", c => c.String(nullable: false, maxLength: 15));
            AddColumn("dbo.AspNetUsers", "LastName", c => c.String(nullable: false, maxLength: 15));
            AddColumn("dbo.AspNetUsers", "BirthDate", c => c.String(nullable: false, maxLength: 20));
            AddColumn("dbo.AspNetUsers", "Address", c => c.String(nullable: false, maxLength: 30));
            AddColumn("dbo.AspNetUsers", "Approved", c => c.Boolean(nullable: false));
            AddColumn("dbo.AspNetUsers", "ImageUrl", c => c.String());
            AddColumn("dbo.AspNetUsers", "VerificationStatus", c => c.String(maxLength: 30));
            AddColumn("dbo.AspNetUsers", "PassengerTypeId", c => c.Int());
            CreateIndex("dbo.AspNetUsers", "PassengerTypeId");
            AddForeignKey("dbo.AspNetUsers", "PassengerTypeId", "dbo.PassengerTypes", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Tickets", "TicketTypeID", "dbo.TicketTypes");
            DropForeignKey("dbo.Tickets", "CatalogueHistoryID", "dbo.CatalogueHistories");
            DropForeignKey("dbo.Tickets", "ApplicationUserID", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUsers", "PassengerTypeId", "dbo.PassengerTypes");
            DropIndex("dbo.AspNetUsers", new[] { "PassengerTypeId" });
            DropIndex("dbo.Tickets", new[] { "ApplicationUserID" });
            DropIndex("dbo.Tickets", new[] { "CatalogueHistoryID" });
            DropIndex("dbo.Tickets", new[] { "TicketTypeID" });
            DropColumn("dbo.AspNetUsers", "PassengerTypeId");
            DropColumn("dbo.AspNetUsers", "VerificationStatus");
            DropColumn("dbo.AspNetUsers", "ImageUrl");
            DropColumn("dbo.AspNetUsers", "Approved");
            DropColumn("dbo.AspNetUsers", "Address");
            DropColumn("dbo.AspNetUsers", "BirthDate");
            DropColumn("dbo.AspNetUsers", "LastName");
            DropColumn("dbo.AspNetUsers", "FirstName");
            DropTable("dbo.Tickets");
        }
    }
}
