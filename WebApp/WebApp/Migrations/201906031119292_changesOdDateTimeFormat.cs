namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changesOdDateTimeFormat : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Catalogues", "ValidFrom", c => c.DateTime(nullable: false, precision: 7, storeType: "datetime2"));
            AlterColumn("dbo.Catalogues", "ValidTo", c => c.DateTime(nullable: false, precision: 7, storeType: "datetime2"));
            AlterColumn("dbo.Tickets", "TimeIssued", c => c.DateTime(nullable: false, precision: 7, storeType: "datetime2"));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Tickets", "TimeIssued", c => c.String(nullable: false, maxLength: 20));
            AlterColumn("dbo.Catalogues", "ValidTo", c => c.String(nullable: false, maxLength: 20));
            AlterColumn("dbo.Catalogues", "ValidFrom", c => c.String(nullable: false, maxLength: 20));
        }
    }
}
