namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CorrectionMigration : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Stations", "Address", c => c.String(nullable: false, maxLength: 30));
            DropColumn("dbo.Stations", "Adresa");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Stations", "Adresa", c => c.String(nullable: false, maxLength: 30));
            DropColumn("dbo.Stations", "Address");
        }
    }
}
