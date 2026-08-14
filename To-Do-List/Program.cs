
using To_Do_List.Data;

namespace To_Do_List
{
	public class Program
	{
		public static void Main(string[] args)
		{
			WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

			// Add services to the container.

			// Register the repository as a singleton
			builder.Services.AddSingleton<ITaskRepository, TaskRepository>();

			// Dev CORS policy: allow local dev servers (adjust origins as needed)
			builder.Services.AddCors(options =>
			{
				options.AddPolicy("DevPolicy", policy =>
				{
					policy.WithOrigins("http://localhost:4200", "http://localhost:58457")
						  .AllowAnyHeader()
						  .AllowAnyMethod();
				});
			});

			builder.Services.AddControllers();
			// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
			builder.Services.AddOpenApi();

			WebApplication app = builder.Build();

			// Configure the HTTP request pipeline.
			if (app.Environment.IsDevelopment())
			{
				app.MapOpenApi();
			}

			app.UseHttpsRedirection();

			// Serve files from wwwroot (drop Angular build here)
			app.UseDefaultFiles();
			app.UseStaticFiles();

			app.UseRouting();

			app.UseCors("DevPolicy");

			app.UseAuthorization();


			app.MapControllers();

			app.Run();
		}
	}
}
