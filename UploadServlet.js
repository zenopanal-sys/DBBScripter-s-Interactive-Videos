import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

@WebServlet("/upload")
@MultipartConfig(fileSizeThreshold=1024*1024*2, maxFileSize=1024*1024*50, maxRequestSize=1024*1024*100)
public class UploadServlet extends HttpServlet {

    private static final String ADMIN_PASSWORD = "wikxam-zuZmyw-cefcu1";

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String password = request.getParameter("adminPassword");
        if (!ADMIN_PASSWORD.equals(password)) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid admin password.");
            return;
        }

        Part videoPart = request.getPart("video");
        String videoFileName = getFileName(videoPart);
        videoPart.write(getServletContext().getRealPath("/videos/") + File.separator + videoFileName);

        for (Part part : request.getParts()) {
            if (part.getName().equals("funscript")) {
                String funscriptFileName = getFileName(part);
                part.write(getServletContext().getRealPath("/funscripts/") + File.separator + funscriptFileName);
            }
        }

        String externalLink = request.getParameter("externalLink");
        // Save external link info as needed (e.g., database or file)

        response.getWriter().println("Upload successful!");
    }

    private String getFileName(Part part) {
        for (String cd : part.getHeader("content-disposition").split(";")) {
            if (cd.trim().startsWith("filename")) {
                return cd.substring(cd.indexOf('=') + 1).trim().replace("\"", "");
            }
        }
        return null;
    }
}