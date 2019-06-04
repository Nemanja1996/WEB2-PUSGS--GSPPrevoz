namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updateTicketClass : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Tickets", "ApplicationUserID", "dbo.AspNetUsers");
            DropIndex("dbo.Tickets", new[] { "ApplicationUserID" });
            AlterColumn("dbo.Tickets", "ApplicationUserID", c => c.String(maxLength: 128));
            CreateIndex("dbo.Tickets", "ApplicationUserID");
            AddForeignKey("dbo.Tickets", "ApplicationUserID", "dbo.AspNetUsers", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Tickets", "ApplicationUserID", "dbo.AspNetUsers");
            DropIndex("dbo.Tickets", new[] { "ApplicationUserID" });
            AlterColumn("dbo.Tickets", "ApplicationUserID", c => c.String(nullable: false, maxLength: 128));
            CreateIndex("dbo.Tickets", "ApplicationUserID");
            AddForeignKey("dbo.Tickets", "ApplicationUserID", "dbo.AspNetUsers", "Id", cascadeDelete: true);
        }
    }
}
